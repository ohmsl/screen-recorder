import { Box, Button, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

function App() {
  const [path, setPath] = useState<string>("");
  async function captureScreenshot() {
    await invoke("capture_screen", {
      path: path || "../public/screenshot.png",
    }).then((res) => {
      if (res) {
        setScreenshotPath(res as string);
      }
    });
  }

  const [screenshotPath, setScreenshotPath] = useState<string>("");

  useEffect(() => {
    if (screenshotPath) {
      const img = new Image();
      img.src = screenshotPath;
      img.onload = () => {
        const screenshotImg = document.getElementById("screenshot-img");
        if (screenshotImg) {
          screenshotImg.setAttribute("src", screenshotPath);
        }
      };
    }
  }, [screenshotPath]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
      }}
    >
      <TextField
        label="Path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <Button onClick={captureScreenshot} variant="contained" color="primary">
        Capture Screenshot
      </Button>
      <img
        id="screenshot-img"
        src="screenshot.png"
        alt="Screenshot"
        style={{ maxWidth: "100%" }}
      />
    </Box>
  );
}

export default App;
