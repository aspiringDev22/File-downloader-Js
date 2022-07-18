const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  // fetching file and returning responses as blob..
  fetch(url).then((res) =>
    res
      .blob()
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(aTag);
        //   console.log(tempUrl);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download file";
      })
      .catch(() => {
        downloadBtn.innerHTML = "Download file";
        alert("Failed to download");
      })
  );
}
