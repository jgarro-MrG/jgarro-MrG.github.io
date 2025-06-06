/* view.js
This file is responsible for all DOM manipulations and rendering the UI.
It takes data (pased by the controller) and display it.
----------------------------------------------*/
const View = (() => {
  const $body = $('body');
  const $nav = $(`<nav class="navbar navbar-expand-lg bg-body-tertiary " ></nav>`);
  const $page = $('#all-contents');
  const $tweetInputForm = $(`
    <div class="row justify-content-center mb-4">
      <div class="col-md-8 col-lg-7">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">What's happening?</h5>
            <form id="tweet-form">
              <div class="mb-3">
                <textarea id="message-input" class="form-control" rows="3" placeholder="Share your thoughts..."></textarea>
              </div>
              <input id="username-input" type="text" hidden /> <input type="submit" id="submit-tweet" class="btn btn-primary float-end" value="Post" />
            </form>
          </div>
        </div>
      </div>
    </div>
  `);
  const $userButtons = $(`
    <div class="row justify-content-center mb-3">
      <div class="col-md-8 col-lg-7 text-center">
         <button id="new-tweets-button" class="btn btn-outline-primary me-2">
           <i class="fas fa-sync-alt"></i> Refresh Feed
         </button>
         <button id="reset-button" class="btn btn-outline-secondary" hidden>
           <i class="fas fa-list"></i> Show All Tweets
         </button>
      </div>
    </div>
  `);
  const $tweetsSection = $(`<div class=" row justify-content-center"></div>`);
  const $feed = $(`<div id="feed-container" class="tweets col-md-8 col-lg-7"></div>`);
  const $footer = $(`
    <footer class="text-center text-muted py-4 mt-5 sticky-bottom bg-body-tertiary">
      <small>Powered by <a href="https://operationspark.org" target="_blank">OperationSpark</a> | <span id="footer-timestamp"></span></small>
    </footer>
  `);

  const returnTimestamp = (date, type) => {
    return type !== 'humanFriendly'
      ? moment(date).format('MMMM Do YYYY, h:mm:ss a')
      : moment(date).fromNow();
  };

  const makeTweetCard = (tweet, userProfile) => {
    const avatar = userProfile ? userProfile.avatar : 'img/default-avatar.png';
    const displayName = userProfile ? userProfile.name : tweet.user;
    const hashtagRegex = /(#[\w_]+)/g; // regex to find hashtags
    const processedMessage = $('<div/>').text(tweet.message).html()
    .replace(hashtagRegex, '<a href="#" class="hashtag">$1</a>');

    return $(`
      <div class="tweet card mb-3 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <img src="${avatar}" class="rounded-circle me-3 avatar" alt="${displayName} Avatar" style="width: 45px; height: 45px;">
            <div class="row">
              <a href="#" class="username card-subtitle mb-0 fw-bold" style="cursor:pointer;" data-username="${tweet.user}">@${tweet.user}</a>
              <small class="text-muted humanFriendlyTimestamp">${returnTimestamp(tweet.created_at, 'humanFriendly')}</small>
              <p class="text-muted timestamp"><small>${returnTimestamp(tweet.created_at)}</small></p>
          </div>
          </div>
          <p class="card-text message lead fs-6">${processedMessage}</p> <div class="interactions mt-3 text-muted" >
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="far fa-comment"></i> <span class="d-none d-sm-inline">Comment</span></a>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="fas fa-retweet"></i> <span class="d-none d-sm-inline">Retweet</span></a>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="far fa-heart"></i> <span class="d-none d-sm-inline">Like</span></a>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="fas fa-chart-simple"></i> <span class="d-none d-sm-inline">Views</span></a>
            <a href="#" class="text-secondary text-decoration-none"><i class="far fa-arrow-alt-circle-up"></i> <span class="d-none d-sm-inline">Share</span></a>
          </div>
        </div>
      </div>
    `);
  };

  // Public API
  return {
    initStructure: () => {
      $body.prepend($nav);
      $nav.append(`
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img width="30" height="30" class="d-inline-block align-text-top" src="img/twiddler-logo.png" />
            Twiddler <small class="text-muted">...Vanilla JS + jQuery MVC App</small>
          </a>
          <button hidden id="new-tweets-button-nav" class="btn btn-outline-dark ms-auto d-lg-none">
            <i class="fas fa-sync-alt"></i> Refresh
          </button>
        </div>
      `);
      $page.addClass('container mt-4');
      $page.append($tweetInputForm);
      $page.append($userButtons);
      $tweetsSection.append($feed);
      $page.append($tweetsSection);
      $('body').append($footer);
      $('#footer-timestamp').text(returnTimestamp(Date.now()));
    },
    renderFeed: (tweets, userProfilesMap, currentFilter) => {
      $feed.empty();

      if (!tweets || tweets.length === 0) {
        $feed.html('<p class="text-center text-muted">No tweets to display.</p>');
        return;
      }
      tweets.forEach(tweet => {
        const userProfile = userProfilesMap[tweet.user];
        $feed.append(makeTweetCard(tweet, userProfile));
      });

    },
    getMessageInput: () => $('#message-input').val().trim(),
    clearMessageInput: () => $('#message-input').val(''),
    // getUsernameInput: () => $('#username-input').val().trim(), // If needed
    // clearUsernameInput: () => $('#username-input').val(''), // If needed
    setResetButtonVisibility: (visible) => {
      if (visible) {
        $('#reset-button').removeAttr('hidden');
      } else {
        $('#reset-button').attr('hidden', 'hidden');
      }
    },
    // Event binding functions to be called by Controller
    bindRefreshFeed: (handler) => {
      // Use document for consistency if other handlers are moved to document,
      // or ensure #new-tweets-button is static and directly under a known static parent.
      // For this specific button, direct binding is usually fine if it's part of initStructure.
      // However, to be safe and consistent with the .username fix, we can delegate from document.
      $(document).on('click', '#new-tweets-button', handler);
      // Potentially also for the nav refresh button if it becomes visible/active
      // $(document).on('click', '#new-tweets-button-nav', handler);
    },
    bindFilterByUser: (handler) => {
      // Use event delegation for dynamically added .username elements
      // Change delegation from $feed to $(document) for robustness in tests.
      // The selector needs to be specific enough to target usernames within the feed.
      $(document).on('click', '#feed-container .username', function(event) {
        event.preventDefault(); // Prevent the link from navigating
        const username = $(this).data('username');
        handler(username); // handler is Controller.handleFilterByUser
      });
    },
      bindFilterByHashtag: (handler) => {
      // Use event delegation for dynamically added .hashtag elements
      $(document).on('click', '#feed-container .hashtag', function(event) {
        event.preventDefault(); // Prevent the link from navigating
        const hashtag = $(this).text(); // Get the text content (e.g., "#techlife")
        handler(hashtag);
      });
    },
    bindShowAllTweets: (handler) => {
      $(document).on('click', '#reset-button', handler);
    },
    bindSubmitTweet: (handler) => {
      // Forms are usually static, direct binding on the form ID is often okay.
      // Delegating from document also works.
      $(document).on('submit', '#tweet-form', (event) => {
        event.preventDefault();
        handler();
      });
    }
  };
})();