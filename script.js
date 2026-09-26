document.addEventListener("DOMContentLoaded", () => {

  /* ========================================= */
  /* ELEMENTS */
  /* ========================================= */

  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const noHint = document.getElementById("noHint");

  const dateCards =
    document.querySelectorAll(".date-card");

  const preferredDate =
    document.getElementById("preferredDate");

  const preferredTime =
    document.getElementById("preferredTime");

  const dateNextBtn =
    document.getElementById("dateNextBtn");

  const dateError =
    document.getElementById("dateError");

  const message =
    document.getElementById("message");

  const charCount =
    document.getElementById("charCount");

  const password =
    document.getElementById("password");

  const togglePassword =
    document.getElementById("togglePassword");

  const submitBtn =
    document.getElementById("submitBtn");

  const passwordError =
    document.getElementById("passwordError");

  const submitStatus =
    document.getElementById("submitStatus");


  /* ========================================= */
  /* SETTINGS */
  /* ========================================= */

  const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz6H0kEcaRWAKZ2dSsvV-UU_R268uxvnirWepL2H_Mvyif1dgBfiy4wJIP9q5JQk__DeQ/exec";

  /*
    IMPORTANT:

    Put your chosen password here.

    Example:
    const SECRET_PASSWORD = "yourpassword";

    Do NOT use your real Gmail password.

    This is only a simple website gate,
    not secure authentication.
  */

  const SECRET_PASSWORD = "baisaneshraddha1@gmail.com";


  /* ========================================= */
  /* DATA */
  /* ========================================= */

  let currentPage = 1;

  let musicStarted = false;

  let noMoveCount = 0;

  const responseData = {
    response: "",
    dateType: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  };


  /* ========================================= */
  /* MUSIC */
  /* ========================================= */

  if (bgMusic) {
    bgMusic.volume = 0.5;
  }


  function startMusic() {

    if (!bgMusic) {
      return;
    }

    if (musicStarted) {
      return;
    }

    bgMusic
      .play()
      .then(() => {

        musicStarted = true;

        if (musicBtn) {
          musicBtn.textContent = "🔊";
        }

      })
      .catch((error) => {

        console.log(
          "Music waiting for user interaction:",
          error
        );

      });
  }


  /*
    Music starts from a real button click.
    This works much better on mobile
    because browsers allow audio after
    user interaction.
  */

  document
    .querySelectorAll(".continue-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        startMusic();

        showPage(currentPage + 1);

      });

    });


  /* ========================================= */
  /* MUSIC TOGGLE */
  /* ========================================= */

  if (musicBtn && bgMusic) {

    musicBtn.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        if (bgMusic.paused) {

          bgMusic
            .play()
            .then(() => {

              musicStarted = true;

              musicBtn.textContent = "🔊";

            })
            .catch((error) => {

              console.log(
                "Music error:",
                error
              );

            });

        } else {

          bgMusic.pause();

          musicBtn.textContent = "🔇";

        }

      }
    );

  }


  /* ========================================= */
  /* PAGE NAVIGATION */
  /* ========================================= */

  function showPage(pageNumber) {

    document
      .querySelectorAll(".page")
      .forEach((page) => {

        page.classList.remove("active");

      });


    const page =
      document.getElementById(
        "page" + pageNumber
      );


    if (!page) {

      console.error(
        "Page not found:",
        pageNumber
      );

      return;

    }


    page.classList.add("active");

    currentPage = pageNumber;


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* ========================================= */
  /* YES BUTTON */
  /* ========================================= */

  if (yesBtn) {

    yesBtn.addEventListener(
      "click",
      () => {

        responseData.response =
          "YES ❤️";

        showPage(6);

      }
    );

  }


  /* ========================================= */
  /* NO BUTTON */
  /* ========================================= */

  function moveNoButton() {

    if (!noBtn) {
      return;
    }


    noMoveCount++;


    const x =
      Math.floor(
        Math.random() * 220
      ) - 110;


    const y =
      Math.floor(
        Math.random() * 140
      ) - 70;


    noBtn.style.transform =
      `translate(${x}px, ${y}px)`;


    if (noHint) {

      const messages = [

        "Are you sure? 😅",

        "That button seems shy...",

        "Maybe give YES a chance? 👀",

        "You almost got it 😂",

        "The NO button doesn't want to cooperate.",

        "Nice try 😭"

      ];


      noHint.textContent =
        messages[
          (noMoveCount - 1)
          % messages.length
        ];

    }

  }


  if (noBtn) {

    /*
      Desktop
    */

    noBtn.addEventListener(
      "mouseenter",
      moveNoButton
    );


    /*
      Mobile
    */

    noBtn.addEventListener(
      "pointerdown",
      (event) => {

        event.preventDefault();

        moveNoButton();

      }
    );


    /*
      Backup click handler
    */

    noBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        moveNoButton();

      }
    );

  }


  /* ========================================= */
  /* DATE OPTIONS */
  /* ========================================= */

  dateCards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        dateCards.forEach(
          (item) => {

            item.classList.remove(
              "selected"
            );

          }
        );


        card.classList.add(
          "selected"
        );


        responseData.dateType =
          card.dataset.date;

      }
    );

  });


  /* ========================================= */
  /* DATE + TIME */
  /* ========================================= */

  if (dateNextBtn) {

    dateNextBtn.addEventListener(
      "click",
      () => {

        if (!responseData.dateType) {

          if (dateError) {

            dateError.textContent =
              "Please choose what kind of date you'd like. ❤️";

          }

          return;

        }


        if (
          !preferredDate ||
          !preferredDate.value
        ) {

          if (dateError) {

            dateError.textContent =
              "Please choose a preferred date.";

          }

          return;

        }


        if (
          !preferredTime ||
          !preferredTime.value
        ) {

          if (dateError) {

            dateError.textContent =
              "Please choose a preferred time.";

          }

          return;

        }


        responseData.preferredDate =
          preferredDate.value;


        responseData.preferredTime =
          preferredTime.value;


        if (dateError) {

          dateError.textContent = "";

        }


        showPage(7);

      }
    );

  }


  /* ========================================= */
  /* MESSAGE CHARACTER COUNT */
  /* ========================================= */

  if (message && charCount) {

    message.addEventListener(
      "input",
      () => {

        charCount.textContent =
          message.value.length;

      }
    );

  }


  /* ========================================= */
  /* PASSWORD SHOW / HIDE */
  /* ========================================= */

  if (
    togglePassword &&
    password
  ) {

    togglePassword.addEventListener(
      "click",
      () => {

        if (
          password.type ===
          "password"
        ) {

          password.type =
            "text";

          togglePassword.textContent =
            "🙈";

        } else {

          password.type =
            "password";

          togglePassword.textContent =
            "👁";

        }

      }
    );

  }


  /* ========================================= */
  /* SUBMIT TO GOOGLE SHEETS */
  /* ========================================= */

  if (submitBtn) {

    submitBtn.addEventListener(
      "click",
      async () => {

        /*
          PASSWORD CHECK
        */

        if (
          !password ||
          password.value !==
          SECRET_PASSWORD
        ) {

          if (passwordError) {

            passwordError.textContent =
              "Incorrect password. Please try again.";

          }

          return;

        }


        if (passwordError) {

          passwordError.textContent = "";

        }


        /*
          MESSAGE
        */

        responseData.message =
          message
            ? message.value.trim()
            : "";


        /*
          BUTTON STATE
        */

        submitBtn.disabled = true;

        submitBtn.innerHTML =
          "Sending... <span>⏳</span>";


        /*
          SEND DATA
        */

        try {

          await fetch(
            GOOGLE_SCRIPT_URL,
            {
              method: "POST",

              mode: "no-cors",

              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body:
                JSON.stringify(
                  responseData
                )
            }
          );


          if (submitStatus) {

            submitStatus.textContent =
              "";

          }


          /*
            Show confirmation
          */

          showPage(8);


        } catch (error) {

          console.error(
            "Submission error:",
            error
          );


          if (submitStatus) {

            submitStatus.textContent =
              "Something went wrong. Please try again.";

          }


          submitBtn.disabled =
            false;


          submitBtn.innerHTML =
            'Send Message <span>→</span>';

        }

      }
    );

  }


  /* ========================================= */
  /* DEBUG MESSAGE */
  /* ========================================= */

  console.log(
    "Website JavaScript loaded successfully."
  );

});