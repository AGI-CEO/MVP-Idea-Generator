document
  .getElementById("mvp-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let skillLevel = document.getElementById("skill-level").value;
    let interests = document.getElementById("interests").value;
    let dislikes = document.getElementById("dislikes").value;

    // Format the data as a natural language query
    let data = `I am a ${skillLevel} skilled person interested in ${interests} and dislike ${dislikes}. Can you suggest 3 MVP app ideas?`;
    // example data: I am a beginner skilled person interested in sports and dislike politics. Can you suggest 3 MVP app ideas?
    fetch(
      "https://flowise.seelanglabs.com/api/v1/prediction/fde8f031-5989-4d7c-bcc7-d2c8f4aff54d",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `I am a ${skillLevel} skilled person interested in ${interests} and dislike ${dislikes}. Can you suggest 3 MVP app ideas?`,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // get the response as text
      })
      .then((data) => {
        let parsedData = JSON.parse(data); // parse the data string into a JavaScript object
        console.log("Server response:", parsedData); // log the server response

        // Check if parsedData and parsedData.ideas are not undefined before proceeding
        if (parsedData && parsedData.ideas) {
          let ideas = parsedData.ideas
            .map((idea) => `<li>${idea}</li>`) // wrap each idea in a <li> tag
            .join("");

          let formattedData = `
            <p>Here are three MVP app ideas:</p>
            <ul>${ideas}</ul>
            <p>${parsedData.message}</p>
            `;

          document.getElementById("idea-container").innerHTML = formattedData;
        } else {
          console.error("Data or data.ideas is undefined");
        }
      })
      .catch((error) => {
        console.error("There was an error parsing the server response!", error);
      });
  });
