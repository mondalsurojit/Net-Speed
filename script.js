let netSpeed = document.getElementById("net-speed");
let checkSpeed = document.getElementById("check-speed");
let noNetAlert = document.getElementById("no-net-alert");
let startTime, finalTime, timeTaken, downloadSpeed;
let downloadFileSize = 3.84 * 8;

// let downloadFile = document.createElement("img");
let downloadFile = new Image();

let initialUrl = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Caerte_van_Oostlant_4MB.jpg";

navigator.onLine ? handleOnline() : handleOffline();
window.addEventListener("offline", handleOffline);
window.addEventListener("online", handleOnline);

function handleOffline() {
    noNetAlert.style.transform = "translateY(0)";
    checkSpeed.removeEventListener("click", mainLogic);
    netSpeed.innerHTML = `00.00 <small>Mb/s</small>`;
    console.log("offline");
}

function handleOnline() {
    noNetAlert.style.transform = "translateY(-120%)";
    checkSpeed.addEventListener("click", mainLogic);
    console.log("online");
}

function mainLogic() {
    startTime = new Date().getTime();
    downloadFile.src = initialUrl + "?v=" + startTime;
    downloadFile.addEventListener("load", onLoad);
    checkSpeed.innerHTML = "Checking...";
    netSpeed.style.setProperty('--display', 'block');
}

function onLoad() {
    finalTime = new Date().getTime();
    timeTaken = (finalTime - startTime) / 1000;
    console.log(`${timeTaken} seconds`);
    downloadSpeed = (downloadFileSize / timeTaken).toFixed(2);
    downloadFile.removeEventListener("load", onLoad);
    checkSpeed.removeEventListener("click", mainLogic);
    displaySpeed(downloadSpeed);
}

function displaySpeed(downloadSpeed) {
    let i = 0;
    let increment = downloadSpeed / 240;
    (function updateSpeed() {
        if (i <= downloadSpeed) {
            netSpeed.innerHTML = `${i.toFixed(2)} <small>Mb/s</small>`;
            i += increment;
            requestAnimationFrame(updateSpeed);
        }
        else {
            checkSpeed.innerHTML = "Check Again";
            netSpeed.style.setProperty('--display', 'none');
            checkSpeed.addEventListener("click", mainLogic);
        }
    })();
}
