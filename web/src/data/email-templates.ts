export function getConfirmEmailTemplate(userName: string, confirmUrl: string) {
  return {
    subject: "Daydream - Confirm your email",
    text: `Hey ${userName},\n\nPlease confirm your email by clicking the following link:\n${confirmUrl}\n`,
    html: `
    <div style="width: 100%; font-family: 'Roboto', sans-serif; padding: 2rem; box-sizing: border-box; text-align: center">
      <h1>Hey, ${userName}</h1>
      <h2>Welcome to Daydream!</h2>
      <p style="margin-bottom: 4rem">Before you can start using the app, you need to verify your email address. Press the link below to proceed.</p>
      <a href=${confirmUrl} style="background-color: #4338ca; color: white; padding: 1rem 2rem; border-radius: 2rem;text-decoration: none; font-size: 1rem">Confirm your email</a>
    </div>
  `,
  };
}
