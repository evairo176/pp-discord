export const generateUsername = (email: string) => {
  // Extract the username part from the email (before the '@' symbol)
  const usernameFromEmail = email.split("@")[0];

  // Generate a random number to make the username unique
  const randomNumber = Math.floor(Math.random() * 1000);

  // Combine the username and random number to create the final username
  const generatedUsername = `${usernameFromEmail}${randomNumber}`;

  // Set the generated username in the state
  return generatedUsername;
};
