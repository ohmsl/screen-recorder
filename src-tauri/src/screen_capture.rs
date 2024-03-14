use std::io;
use std::path::{Path, PathBuf};
use std::process::Command;

/// Captures a screenshot of the entire desktop and saves it to the specified file.
///
/// # Arguments
///
/// * `output_file` - A string slice that holds the name of the output file.
///
/// # Example
///
/// ```rust
/// capture_screenshot("screenshot.png").expect("Failed to capture screenshot");
/// ```
///
/// # Errors
///
/// This function will return an `io::Error` if FFmpeg fails to start or if there is a problem
/// capturing the screenshot.
pub fn capture_screenshot(output_file: &str) -> io::Result<String> {
    let mut index = 0;
    let mut screenshot_path = PathBuf::from(output_file);

    while screenshot_path.exists() {
        index += 1;
        let file_name = screenshot_path.file_stem().unwrap().to_str().unwrap();
        let file_extension = screenshot_path.extension().unwrap().to_str().unwrap();
        screenshot_path =
            screenshot_path.with_file_name(format!("{}_{}.{}", file_name, index, file_extension));
    }

    Command::new("ffmpeg")
        .args([
            "-f",
            "gdigrab", // Use the GDI grabber on Windows to capture the screen
            "-i",
            "desktop", // Specify the input as the desktop screen
            "-vframes",
            "1",                               // Capture only one frame (a screenshot)
            screenshot_path.to_str().unwrap(), // The output file path and name
        ])
        .output()?; // Execute the FFmpeg command and wait for it to finish

    println!("Screenshot saved to {}", screenshot_path.to_str().unwrap());
    Ok(screenshot_path.to_str().unwrap().to_string())
}
