export class User {
  displayName;
  emailAddress;
  photoUrl;
  emailVerified;
  userId;
  followers;
  following;

  constructor(
    displayName,
    emailAddress,
    photoUrl,
    userId,
    followers,
    following
  ) {
    this.displayName = displayName == null ? '' : displayName;
    this.emailAddress = emailAddress == null ? '' : displayName;
    this.photoUrl = photoUrl == null ? '' : displayName;
    this.userId = userId;
    this.followers = followers;
    this.following = following;
  }

  toJSON() {
    return {
      displayName: this.displayName,
      emailAddress: this.emailAddress,
      photoUrl: this.photoUrl,
      userId: this.userId,
      followers: this.followers.map((user) => user.toJSON()),
      following: this.following.map((user) => user.toJSON()),
    };
  }

  fromJSON(jsonData) {
    this.displayName = jsonData.displayName == null ? '' : jsonData.displayName;
    this.emailAddress =
      jsonData.emailAddress == null ? '' : jsonData.emailAddress;
    this.photoUrl = jsonData.photoUrl == null ? '' : jsonData.photoUrl;
    this.userId = jsonData.userId;
    this.followers = jsonData.followers.map((user) => {
      const loggedInUser = new User();

      loggedInUser.fromJSON(user);

      return loggedInUser;
    });
    this.following = jsonData.following.map((user) => {
      const loggedInUser = new User();

      loggedInUser.fromJSON(user);

      return loggedInUser;
    });
  }
}
