UserListContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const currentUser = BBB.getCurrentUser();
    const isCurrentUserModerator = currentUser.user.role === "MODERATOR";
    const currentUserId = currentUser.userId;

    console.log(currentUser);
    return {
      // All this mapping should be on a service and not on the component itself
      currentUserModerator: isCurrentUserModerator,
      users: Meteor.Users.find().fetch().map(u => u.user).map(u => {
        return {
          id: u.userid,
          name: u.name,
          isCurrent: u.userid === currentUserId,
          isPresenter: u.presenter,
          isModerator: u.role === "MODERATOR",
          emoji: u.emoji_status,
          sharingStatus: {
            isLocked: true, //TODO: Migrate blaze logic
            isWebcamOpen: u.webcam_stream.length,
            isListenOnly: u.listenOnly,
            isMuted: u.voiceUser.muted,
            isTalking: u.voiceUser.talking
          }
        };
      })
    };
  },

  render() {
    return (
      <div id="users" className="component">
        <h3 className="meetingTitle">DEMO</h3>
        <div id="user-contents">
          <UserList users={this.data.users} currentUserModerator={this.data.currentUserModerator}/>
        </div>
      </div>
    );
  }
})
