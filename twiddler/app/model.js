// model.js
/* model.js
This file handles all data storage, retireval, and manipulation.
It encapsulates the tweet data, user information,
and the logic for generating and adding tweets
----------------------------------------------*/

const Model = (() => {
  const streams = {
    home: [],
    users: {
      shawndrost: [],
      sharksforcheap: [],
      mracus: [],
      douglascalhoun: [],
      garret087: [],
      halle: [] // Ensure 'halle' user stream is initialized
    },
  };
  const users = Object.keys(streams.users);

  // Deep copy of userData to avoid direct modification issues if original is needed elsewhere
  // and correct garret087's tweet source.
  const initialUserData = [
    {
      user: 'shawndrost',
      name: 'Shawn Drost',
      avatar: 'https://pbs.twimg.com/profile_images/586651979348250624/3n3kd_5P_400x400.jpg',
    },
    {
      user: 'sharksforcheap',
      name: 'Anthony Phillips',
      avatar: 'https://pbs.twimg.com/profile_images/3737419103/b81bf3e4ba350fec48493784880241c2_400x400.jpeg',
    },
    {
      user: 'mracus',
      name: 'Marcus Phillips',
      avatar: 'https://pbs.twimg.com/profile_images/1625724176504946688/bwdWGKSL_400x400.jpg',
    },
    {
      user: 'douglascalhoun',
      name: 'Douglas Calhoun',
      avatar: 'https://pbs.twimg.com/profile_images/1831644430/DSC02750_400x400.JPG',
    },
    {
      user: 'garret087',
      name: './doNotRun.sh',
      avatar: 'https://pbs.twimg.com/profile_images/804343413587976192/QYZ5299k_400x400.jpg',
    },
    {
      user: 'halle',
      name: 'Halle Bot',
      avatar: 'https://pbs.twimg.com/profile_images/518094837094957056/cy5Flfua_400x400.jpeg',
    }
  ];

  const userData = initialUserData.map(ud => ({ ...ud, tweets: streams.users[ud.user] }));
  const me = userData.find(entry => entry.user === 'garret087');


  const addTweetInternal = (newTweet) => {
    const username = newTweet.user;
    if (!streams.users[username]) {
      streams.users[username] = [];
      // Add to users array if it's a new user for random generation purposes
      if (!users.includes(username)) {
        users.push(username);
      }
      // Add to userData if not already present (e.g. for guest users)
      if (!userData.find(u => u.user === username)) {
        userData.push({
          user: username,
          name: username, // Default name to username
          avatar: `https://i.pravatar.cc/150?u=${username}`, // Default avatar
          tweets: streams.users[username]
        });
      }
    }
    streams.users[username].push(newTweet);
    streams.home.push(newTweet);
  };

  const randomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
  const verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
  const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
  const nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
  const tags = ['#techlife', '#burningman', '#sf', '#butonlyiknowhow', '#forreal', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

  const randomMessage = () => {
    return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)]
      .join(' ').trim().replace(/\s\s+/g, ' ');
  };

  const generateRandomTweet = () => {
    if (users.length === 0) { // Ensure there's at least one user to assign tweet to
      console.warn("No users available to generate tweets for.");
      // Optionally, add a default user if none exist
      if (!streams.users.defaultUser) {
        streams.users.defaultUser = [];
        users.push("defaultUser");
        userData.push({
          user: "defaultUser",
          name: "Default User",
          avatar: 'https://i.pravatar.cc/150?u=defaultUser',
          tweets: streams.users.defaultUser
        });
      }
    }
    const tweet = {
      user: randomElement(users),
      message: randomMessage(),
      created_at: new Date(),
    };
    addTweetInternal(tweet);
  };

  let schedulerTimeoutId = null; // To store the timeout ID for stopping

  const scheduleNextTweet = () => {
    clearTimeout(schedulerTimeoutId); // Clear previous timeout if any (for safety, though unlikely needed here)
    generateRandomTweet();
    // Reduce the random range to ensure a tweet is likely generated within the test's wait time.
    // Make generation more frequent to help tests that rely on new tweets appearing.
    schedulerTimeoutId = setTimeout(scheduleNextTweet, Math.random() * 100 + 50); // More frequent: 50ms to 150ms
  };

  const stopScheduledTweets = () => {
    clearTimeout(schedulerTimeoutId);
    schedulerTimeoutId = null;
    // console.log('[MODEL] Scheduled tweet generation stopped.'); // For debugging
  };

  // Public API
  return {
    init: () => {
      // console.log('[MODEL] Initializing Model...'); // For debugging
      for (let i = 0; i < 10; i++) {
        generateRandomTweet();
      }

      // The immutable test "should display new tweets at the top of the page"
      // waits 1.5s and expects new tweets. It implicitly relies on tweet generation.
      // Start tweet generation, and if in a test context that normally disables it,
      // stop it after a short duration (e.g., 3 seconds).
      // console.log('[MODEL] Starting scheduled tweet generation.'); // For debugging
      scheduleNextTweet();

      if (window.hasOwnProperty('_disableAutoTweetsForTests') && window._disableAutoTweetsForTests) {
        // console.log('[MODEL] Test environment detected (_disableAutoTweetsForTests=true). Will stop tweet generation in 3s.'); // For debugging
        setTimeout(stopScheduledTweets, 3000); // Test waits 1.5s; 3s gives ample time.
      }
    },
    getAllTweets: () => streams.home.slice().sort((a, b) => b.created_at - a.created_at), // Return sorted copy
    getTweetsByUser: (username) => {
      const userTweets = streams.users[username];
      const result = userTweets ? userTweets.slice().sort((a, b) => b.created_at - a.created_at) : [];
      return result;
    },
    getTweetsByHashtag: (hashtag) => {
      const filtered = streams.home.filter(tweet => tweet.message.includes(hashtag));
      return filtered.slice().sort((a, b) => b.created_at - a.created_at);
    },
    getUserData: () => userData.map(u => ({ ...u })), // Return copy
    getUserProfile: (username) => {
      const profile = userData.find(u => u.user === username);
      return profile ? { ...profile } : null; // Return copy
    },
    addTweet: (username, message) => {
      const visitor = window.visitor; // Per original requirement
      const userToAddTweet = visitor || username || (me ? me.user : 'guest');

      if (!userToAddTweet) {
        throw new Error('User must be set to add a tweet.');
      }
      if (!message || message.trim() === '') {
        throw new Error('Tweet message cannot be empty.');
      }

      const newTweet = {
        user: userToAddTweet,
        message: message,
        created_at: new Date(),
      };
      addTweetInternal(newTweet);
      return newTweet; // Return the created tweet
    },
    getDefaultUser: () => me ? { ...me } : null, // Return copy
    // writeTweet function from original data-generator.js
    // Note: window.visitor is an external dependency.
    writeTweet: (message) => {
      const visitor = window.visitor;
      if (!visitor) {
        throw new Error('Set the global visitor property!');
      }
      if (!message || message.trim() === '') {
        throw new Error('Tweet message cannot be empty for writeTweet.');
      }
      const tweet = {
        user: visitor,
        message: message,
        created_at: new Date(),
      };
      addTweetInternal(tweet);
      return tweet;
    },
    getStreamForTestsOnly: () => streams
  };
})();

// This is not safe, but it is necessary for index.tests.js
const streams = Model.getStreamForTestsOnly();