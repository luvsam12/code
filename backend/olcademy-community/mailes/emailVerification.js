const emailVerification = (link) => {

    return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Hello</title>
         </head>
     
             <body style="margin: 0; padding: 0;">
             
                <br />
                <br />

                <div> We have received a request for email verify , click this link to Verify your email <a href = "http://localhost:4200/verify/${link}"></a> <b>http://localhost:4200/verify/${link}</b>  </div>
                <br />
                <br />
                <h3>Kaisi lagi website batana jarur </h3>
             </body>
     
       </html>
      `;
  };
  
  module.exports = { emailVerification };
  