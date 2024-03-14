import { CameraAlt, FiberManualRecord, Settings } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import GradientIconButton from "./components/GradientIconButton";

type CaptureSettings = {
  path: string;
  monitor: string;
  cursor: boolean;
  format: string;
};

const defaultCaptureSettings: CaptureSettings = {
  path: "",
  monitor: "",
  cursor: true,
  format: "png",
};

function App() {
  const [availableWindows, setAvailableWindows] = useState<Array<string>>([]);

  useEffect(() => {
    invoke("get_windows").then((res) => {
      if (res) {
        setAvailableWindows(res as Array<string>);
      } else {
        console.error("Failed to get available windows");
      }
    });
  }, []);

  const [captureSettings, setCaptureSettings] = useState<CaptureSettings>(
    defaultCaptureSettings
  );
  const [captureSettingsAnchorEl, setCaptureSettingsAnchorEl] =
    useState<null | HTMLElement>(null);

  async function captureScreenshot() {
    console.log(captureSettings);
    await invoke("capture_screen", {
      path: "screenshot.png",
      windowTitle: captureSettings.monitor,
      format: captureSettings.format,
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
    <>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <GradientIconButton
          color="primary"
          onClick={captureScreenshot}
          size="large"
        >
          <CameraAlt />
        </GradientIconButton>
        <GradientIconButton
          color="primary"
          onClick={captureScreenshot}
          size="large"
        >
          <FiberManualRecord />
        </GradientIconButton>
        <IconButton
          size="medium"
          onClick={(e) => setCaptureSettingsAnchorEl(e.currentTarget)}
        >
          <Settings />
        </IconButton>
        <Popover
          open={Boolean(captureSettingsAnchorEl)}
          anchorEl={captureSettingsAnchorEl}
          onClose={() => setCaptureSettingsAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Capture Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={captureSettings.cursor}
                    onChange={(e) =>
                      setCaptureSettings({
                        ...captureSettings,
                        cursor: e.target.checked,
                      })
                    }
                  />
                }
                label="Capture Cursor"
              />
              <TextField
                label="Path"
                value={captureSettings.path}
                onChange={(e) =>
                  setCaptureSettings({
                    ...captureSettings,
                    path: e.target.value,
                  })
                }
              />
              <FormControl fullWidth>
                <InputLabel id="monitor-label">Monitor</InputLabel>
                <Select
                  labelId="monitor-label"
                  value={captureSettings.monitor}
                  label="Monitor"
                  onChange={(e) =>
                    setCaptureSettings({
                      ...captureSettings,
                      monitor: e.target.value,
                    })
                  }
                >
                  {availableWindows.map((window, index) => (
                    <MenuItem key={index} value={window || ""}>
                      {window}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="format-label">Format</InputLabel>
                <Select
                  labelId="format-label"
                  value={captureSettings.format}
                  label="Format"
                  onChange={(e) =>
                    setCaptureSettings({
                      ...captureSettings,
                      format: e.target.value as string,
                    })
                  }
                >
                  <MenuItem value="png">PNG</MenuItem>
                  <MenuItem value="jpeg">JPEG</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Popover>
      </Box>
      <img
        id="screenshot-img"
        src="screenshot.png"
        alt="Screenshot"
        style={{ maxWidth: "95%" }}
      />
    </>
  );
}

export default App;
