$(() => {
  // build html structure
  const $nav = $(`<nav class="navbar navbar-expand-lg bg-body-tertiary " ></nav>`)
  $('body').prepend($nav);
  $nav.append(`
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img width="30" height="30" class="d-inline-block align-text-top" src="img/twiddler-logo.png" />
        Twiddler!
      </a>
      <button hidden id="new-tweets-button-nav" class="btn btn-outline-dark ms-auto d-lg-none">
        <i class="fas fa-sync-alt"></i> Refresh
      </button>
    </div>
      `);
  const $page = $('#all-contents');
  $page.addClass('container mt-4')
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
              <input id="username-input" type="text" hidden />
              <input type="submit" id="submit-tweet" class="btn btn-primary float-end" value="Post" />
            </form>
          </div>
        </div>
      </div>
    </div>
    `);
  $page.append($tweetInputForm);
  $userButtons = $(`
    <div class="row justify-content-center mb-3">
      <div class="col-md-8 col-lg-7 text-center">
         <button id="new-tweets-button" class="btn btn-outline-primary me-2">
           <i class="fas fa-sync-alt"></i> Refresh Feed
         </button>
         <button id="reset-button" class="btn btn-outline-secondary" >
           <i class="fas fa-list"></i> Show All Tweets
         </button>
      </div>
    </div>
    `);
  $page.append($userButtons);
  const $tweetsSection = $(`<div class=" row justify-content-center"></div>`)
  const $feed = $(`<div id="feed-container" class="tweets col-md-8 col-lg-7"></div>`);
  $tweetsSection.append($feed);
  $page.append($tweetsSection);
  $

  const $footer = $(`
    <footer class="text-center text-muted py-4 mt-5 sticky-bottom bg-body-tertiary">
      <small>Powered by <a href="https://operationspark.org" target="_blank">Operation Spark</a> | ${returnTimestamp(Date.now())}</small>
    </footer>
    `);
  $('body').append($footer);
  // renders the entire feed
  function renderFeed(userFilter = 'all') {
    $feed.empty();
    const tweets = getTweets(userFilter);
    tweets.forEach(tweet => {
      $feed.prepend(makeTweetCard(tweet));
    });
  }

  // returns a tweet object as HTML tags
  function makeTweetCard(tweet) {
    const userProfile = userData.find(u => u.user === tweet.user);
    const avatar = userProfile ? userProfile.avatar : 'img/default-avatar.png'; // Provide a path to a default avatar
    const $tweetCard = $(`
      <div class="tweet card mb-3 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <img src="${avatar}" class="rounded-circle me-3 avatar" alt="${tweet.user} Avatar" style="width: 45px; height: 45px;">
            <div>
              <h6 class="card-subtitle mb-0 fw-bold username" style="cursor:pointer;" data-username="${tweet.user}">@${tweet.user}</h6>
              <small class="text-muted timestamp">${returnTimestamp(tweet.created_at)}</small>
              <small class="text-muted humanFriendlyTimestamp">...${returnTimestamp(tweet.created_at,'humanFriendly')}</small>
            </div>
          </div>
          <p class="card-text message lead fs-6">${tweet.message}</p>
          <div class="interactions mt-3 text-muted" hidden>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="far fa-comment"></i> <span class="d-none d-sm-inline">Comment</span></a>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="fas fa-retweet"></i> <span class="d-none d-sm-inline">Retweet</span></a>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="far fa-heart"></i> <span class="d-none d-sm-inline">Like</span></a>
            <a href="#" class="text-secondary me-3 text-decoration-none"><i class="fas fa-chart-simple"></i> <span class="d-none d-sm-inline">Views</span></a>
            <a href="#" class="text-secondary text-decoration-none"><i class="far fa-arrow-alt-circle-up"></i> <span class="d-none d-sm-inline">Share</span></a>
          </div>
        </div>
      </div>
    `);
    return $tweetCard;
  }

  // retreives current tweets as HTML
  // filters tweets by user (if specified)
  function getTweets(userFilter) {
    let criteria = userFilter === 'all'
      ? tweet => true
      : tweet => tweet.user === userFilter;
    return streams.home.filter(criteria);
  }
  // Event: Manually update the feed with any new generated tweets
  $('#new-tweets-button').on('click', function () {
    renderFeed();
  });

  // Event: Users clicks username to filter tweets by that user only
  $(document).on('click', '.username', function () {
    const username = $(this).text().replace('@', '');
    $('#reset-button').attr('hidden', false);
    renderFeed(username);

  });

  // Event: user clicks reset button to clear the user filter
  $(document).on('click', '#reset-button', function () {
    $('#reset-button').attr('hidden', true);
    renderFeed();

  });

  // Event: Add a new tweet from the current user
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission/page reload

    const username = $('#username-input').val().trim() || me.user;
    const message = $('#message-input').val().trim();

    if (!username || !message) return; // Don't proceed if username or message is empty

    const tweet = {
      user: username,
      message,
      created_at: new Date()
    };

    // Register new user if they don't exist
    if (!streams.users[username]) {
      streams.users[username] = [];
      userData.push({
        user: username,
        name: username,
        avatar: `https://i.pravatar.cc/150?u=${username}`,
        tweets: streams.users[username]
      });
    }
    addTweet(tweet);
    $('#message-input').val('');
    $('#username-input').val('');
    renderFeed();
  });

  // Event: Initial feed render
  renderFeed();

  // helper function to return formatted ot huma-readable timestapms
  function returnTimestamp(date, type) {
    return type !== 'humanFriendly'
      ? moment(date).format('MMMM Do YYYY, h:mm:ss a')
      : moment(date).fromNow();
  }

})
