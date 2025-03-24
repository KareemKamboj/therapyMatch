/**
 * @fileoverview Matching service that implements the core matching algorithm for TherapyMatch.
 * This service is responsible for finding and ranking potential therapy matches based on
 * seeker preferences and helper profiles.
 */

import { User } from '../models/User';
import mongoose from 'mongoose';

/**
 * Interface representing the matching score and criteria for a potential helper match.
 * @interface MatchScore
 */
interface MatchScore {
  /** MongoDB ObjectId of the helper */
  helper: mongoose.Types.ObjectId;
  /** Overall match score (0-100) */
  score: number;
  /** Detailed breakdown of matching criteria scores */
  matchedCriteria: {
    /** Language match score (0-30) */
    languages: number;
    /** Therapy type match score (0-25) */
    therapyTypes: number;
    /** Specialties match score (0-25) */
    specialties: number;
    /** Availability match score (0-20) */
    availability: number;
  };
}

/**
 * Finds and ranks potential therapy matches for a seeker based on their preferences.
 * 
 * The matching algorithm considers multiple weighted criteria:
 * - Languages (30%): Matches between seeker's preferred languages and helper's spoken languages
 * - Therapy Types (25%): Alignment of preferred therapy types
 * - Specialties (25%): Overlap between needed and offered specialties
 * - Availability (20%): Compatibility of schedules (days: 10%, times: 10%)
 * 
 * @param seekerId - MongoDB ObjectId of the seeker
 * @param limit - Maximum number of matches to return (default: 10)
 * @returns Promise containing an array of matched helpers with their scores
 * @throws {Error} If seeker preferences are not found
 * 
 * @example
 * ```typescript
 * const matches = await findMatches(seekerId, 5);
 * // Returns top 5 matches with their scores and matched criteria
 * ```
 */
export const findMatches = async (seekerId: mongoose.Types.ObjectId, limit: number = 10) => {
  try {
    // Fetch seeker profile and validate preferences exist
    const seeker = await User.findById(seekerId);
    if (!seeker || !seeker.seekerPreferences) {
      throw new Error('Seeker preferences not found');
    }

    // Get all verified helpers
    const helpers = await User.find({
      role: 'helper',
      'helperProfile.isVerified': true,
    });

    const scores: MatchScore[] = [];

    for (const helper of helpers) {
      if (!helper.helperProfile) continue;

      // Calculate language match score (30%)
      const languageMatches = helper.helperProfile.languages.filter(lang => 
        seeker.seekerPreferences!.languages.includes(lang)
      ).length;
      const languageScore = (languageMatches / seeker.seekerPreferences.languages.length) * 30;

      // Calculate therapy type match score (25%)
      const therapyTypeMatches = helper.helperProfile.therapyTypes.filter(type =>
        seeker.seekerPreferences!.therapyType.includes(type)
      ).length;
      const therapyTypeScore = (therapyTypeMatches / seeker.seekerPreferences.therapyType.length) * 25;

      // Calculate specialties match score (25%)
      const specialtyMatches = helper.helperProfile.specialties.filter(specialty =>
        seeker.seekerPreferences!.specialties.includes(specialty)
      ).length;
      const specialtyScore = (specialtyMatches / seeker.seekerPreferences.specialties.length) * 25;

      // Calculate availability match score (20%)
      const seekerAvailability = seeker.seekerPreferences.availability;
      const helperAvailability = helper.helperProfile.availability;
      
      // Days match (10%)
      const dayMatches = helperAvailability.availableDays.filter(day =>
        seekerAvailability.preferredDays.includes(day)
      ).length;
      
      // Time slots match (10%)
      const timeMatches = helperAvailability.availableTimes.filter(time =>
        seekerAvailability.preferredTimes.includes(time)
      ).length;

      const availabilityScore = (
        (dayMatches / seekerAvailability.preferredDays.length) * 10 +
        (timeMatches / seekerAvailability.preferredTimes.length) * 10
      );

      // Calculate total score (0-100)
      const totalScore = languageScore + therapyTypeScore + specialtyScore + availabilityScore;

      scores.push({
        helper: helper._id as mongoose.Types.ObjectId,
        score: totalScore,
        matchedCriteria: {
          languages: languageScore,
          therapyTypes: therapyTypeScore,
          specialties: specialtyScore,
          availability: availabilityScore,
        },
      });
    }

    // Sort by score descending and limit results
    const topMatches = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Fetch full helper details for top matches (excluding sensitive data)
    const matchedHelpers = await User.find({
      _id: { $in: topMatches.map(match => match.helper) },
    })
      .select('-password')
      .lean();

    // Combine helper details with match scores and return
    return matchedHelpers.map(helper => ({
      ...helper,
      matchScore: topMatches.find(match => match.helper.toString() === (helper._id as mongoose.Types.ObjectId).toString())!.score,
      matchedCriteria: topMatches.find(match => match.helper.toString() === (helper._id as mongoose.Types.ObjectId).toString())!.matchedCriteria,
    }));
  } catch (error) {
    throw error;
  }
}; 