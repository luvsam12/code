const forgotPassword = (link) => {
    // console.log(link);

    return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Hello</title>
         </head>

             <body style="margin: 0; padding: 0;">

                <br />
                <br />
                <div>Had you forgot Your Password, click this link to reset Your Password</div>
                <div> <a href = "http://localhost:4200/checkToken/${link}"></a> <b>http://localhost:4200/checkToken/${link}</b>  </div>
                <div>Please do not share the link with anyone</div>
                <br />
                <br />
             </body>

       </html>
      `;
  };

    module.exports = { forgotPassword };
