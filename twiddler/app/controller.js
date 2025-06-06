/* controller.js
This file handles user input (events), fetches data from the Model,
and then tells the View to update
----------------------------------------------*/
// controller.js
$(() => { // Document ready
  const Controller = (() => {
    let currentFilter = { type: 'all', value: null }; // 'all', 'user', or 'hashtag'
    const processAndRenderTweets = (filterToUse) => {
      // Changed log message for clarity
      let tweets;
      switch (filterToUse.type) {
        case 'user':
          tweets = Model.getTweetsByUser(filterToUse.value);
          break;
        case 'hashtag':
          tweets = Model.getTweetsByHashtag(filterToUse.value);
          break;
        case 'all':
        default:
          tweets = Model.getAllTweets();
          break;
      }

      const allUserData = Model.getUserData();
      const userProfilesMap = allUserData.reduce((acc, user) => {
        acc[user.user] = user;
        return acc;
      }, {});

      View.renderFeed(tweets, userProfilesMap, filterToUse);
    };

    const loadAndRenderTweets = () => {
      processAndRenderTweets(currentFilter);
    };

    const handleRefreshFeed = () => {
      processAndRenderTweets(currentFilter); // Refresh with the current filter
    };

    const handleFilterByUser = (username) => {
      currentFilter = { type: 'user', value: username };
      View.setResetButtonVisibility(true);
      processAndRenderTweets(currentFilter); // Explicitly use the new filter
    };

    const handleFilterByHashtag = (hashtag) => {
      currentFilter = { type: 'hashtag', value: hashtag };
      View.setResetButtonVisibility(true);
      processAndRenderTweets(currentFilter); // Explicitly use the new filter
    };

    const handleShowAllTweets = () => {
      currentFilter = { type: 'all', value: null };
      View.setResetButtonVisibility(false);
      processAndRenderTweets(currentFilter); // Explicitly use the 'all' filter
    };

    const handleSubmitTweet = () => {
      const message = View.getMessageInput();
      // const username = View.getUsernameInput() || (Model.getDefaultUser() ? Model.getDefaultUser().user : 'guest');
      // For simplicity, let's use the default user ('me' / 'garret087') or 'visitor' if set
      // Model.addTweet will handle `window.visitor` or passed username.
      // If `window.visitor` is not set, and you want to use a specific input, get it from View.
      // Otherwise, let Model.addTweet use its fallback (default user or error if none).

      const defaultUser = Model.getDefaultUser();
      const usernameForTweet = window.visitor || (defaultUser ? defaultUser.user : null);

      if (message) {
        try {
          Model.addTweet(usernameForTweet, message); // Model handles new user creation logic if username is new
          View.clearMessageInput();
          processAndRenderTweets(currentFilter); // Refresh feed (respecting current filter) to show new tweet
        } catch (error) {
          console.error("Error submitting tweet:", error.message);
          alert("Could not post tweet: " + error.message); // Simple error feedback
        }
      } else {
        alert("Tweet message cannot be empty.");
      }
    };

    // Public API for Controller (if any needed externally, otherwise just init)
    return {
      init: () => {
        console.log('[Controller] Initializing Controller...');
        View.initStructure(); // Build the basic page layout

        Model.init(); // Start data generation

        // Set up event listeners by calling View's binding methods
        View.bindRefreshFeed(handleRefreshFeed);
        View.bindFilterByUser(handleFilterByUser);
        View.bindFilterByHashtag(handleFilterByHashtag);
        View.bindShowAllTweets(handleShowAllTweets);
        View.bindSubmitTweet(handleSubmitTweet);

        // Initial feed render
        View.setResetButtonVisibility(false); // Initially hidden
        processAndRenderTweets(currentFilter); // Initial load with 'all' filter
      }
    };
  })();
  Controller.init(); // Initialize the application
});