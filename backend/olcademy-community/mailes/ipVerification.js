const ipVerification = ({ ipAddress, user }) => {
  return `
      <!DOCTYPE html>
      <html style="margin: 0; padding: 0;">
         <head>
             <title>Hello</title>
         </head>
             <body style="margin: 0; padding: 0;">
                <br />
                <br />
                <div> You are loggedIn from ip=${ipAddress}</b></div>
                <div>click <a href="http://localhost:7000/block/${ipAddress}/${user}">here</a> if this is not you</div>
                
             </body>
     
       </html>
      `;
};

module.exports = { ipVerification };
