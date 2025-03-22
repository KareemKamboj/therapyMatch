import React from 'react';

interface Quote {
  content: string;
  author: string;
}

const mentalHealthQuotes: Quote[] = [
  { content: "Mental health…is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer, PhD" },
  { content: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
  { content: "You, yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
  { content: "Self-care is how you take your power back.", author: "Lalah Delia" },
  { content: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
  { content: "The strongest people are not those who show strength in front of us but those who win battles we know nothing about.", author: "Jonathan Harnisch" },
  { content: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
  { content: "Healing is not linear.", author: "Unknown" },
  { content: "Rest is not idle, it is not wasteful. Sometimes rest is the most productive thing you can do for your body and soul.", author: "Erica Layne" },
  { content: "Feelings are just visitors. Let them come and go.", author: "Mooji" },
  { content: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.", author: "Julian Seifter" },
  { content: "Mental pain is less dramatic than physical pain, but it is more common and also more hard to bear.", author: "C.S. Lewis" },
  { content: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", author: "J.K. Rowling" },
  { content: "Vulnerability sounds like truth and feels like courage.", author: "Brené Brown" },
  { content: "You can't stop the waves, but you can learn to surf.", author: "Jon Kabat-Zinn" },
  { content: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
  { content: "Our wounds are often the openings into the best and most beautiful part of us.", author: "David Richo" },
  { content: "Sometimes we just need someone to simply be there, not to fix anything, but to let us feel that we are supported and not alone.", author: "Unknown" },
  { content: "Be patient and tough; someday this pain will be useful to you.", author: "Ovid" },
  { content: "Healing is an art. It takes time, it takes practice. It takes love.", author: "Maza Dohta" },
  { content: "A big part of emotional intelligence is being able to feel an emotion without having to act on it.", author: "Unknown" },
  { content: "The mind is like water. When it is turbulent, it's difficult to see. When it is calm, everything becomes clear.", author: "Prasad Mahes" },
  { content: "Every day may not be good, but there is something good in every day.", author: "Alice Morse Earle" },
  { content: "You're not weak for struggling. You're strong for continuing to fight.", author: "Unknown" },
  { content: "Healing begins where the wound was made.", author: "Alice Walker" },
  { content: "You deserve to take up space in the world and to be loved for who you are.", author: "Daniell Koepke" },
  { content: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
  { content: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
  { content: "If you get tired, learn to rest, not to quit.", author: "Banksy" },
  { content: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.", author: "Mandy Hale" },
  { content: "Talk to yourself like you would to someone you love.", author: "Brené Brown" },
  { content: "Self-love, self-respect, self-worth… there's a reason they all start with 'self.' You can't find them in anyone else.", author: "Unknown" },
  { content: "What mental health needs is more sunlight, more candor, and more unashamed conversation.", author: "Glenn Close" },
  { content: "Let go of who you think you're supposed to be; embrace who you are.", author: "Brené Brown" },
  { content: "The only way out is through.", author: "Robert Frost" },
  { content: "Not everything that weighs you down is yours to carry.", author: "Unknown" },
  { content: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'", author: "Mary Anne Radmacher" },
  { content: "Do not judge my story by the chapter you walked in on.", author: "Unknown" },
  { content: "It's okay to not be okay, as long as you are not giving up.", author: "Karen Salmansohn" },
  { content: "Healing doesn't mean the damage never existed. It means the damage no longer controls your life.", author: "Akshay Dubey" },
  { content: "Nothing in nature blooms all year. Be patient with yourself.", author: "Unknown" },
  { content: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { content: "Sometimes the people around you won't understand your journey. They don't need to, it's not for them.", author: "Joubert Botha" },
  { content: "Just because no one else can heal or do your inner work for you doesn't mean you can, should, or need to do it alone.", author: "Lisa Olivera" },
  { content: "Small, consistent steps lead to big changes in mental health.", author: "Unknown" },
  { content: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
  { content: "Healing begins the moment you feel heard.", author: "Cheryl Richardson" }
];

function QuoteOfTheDay() {
  // Get the current date and use it to select a quote
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % mentalHealthQuotes.length;
  const quote = mentalHealthQuotes[quoteIndex];

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center space-x-2 mb-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-sm font-medium">Quote of the Day</span>
      </div>
      <blockquote className="text-lg italic mb-4">
        "{quote.content}"
      </blockquote>
      <p className="text-sm text-white/80">— {quote.author}</p>
    </div>
  );
}

export default QuoteOfTheDay; 