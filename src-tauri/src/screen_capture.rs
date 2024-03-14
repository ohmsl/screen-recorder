use std::io;
use std::path::PathBuf;
use std::process::Command;

/// Captures a screenshot of a specified window and saves it to the specified file.
///
/// # Arguments
///
/// * `output_file` - A string slice that holds the name of the output file.
/// * `window_title` - The title of the window to capture.
/// * `output_format` - The output format (e.g., "png").
///
/// # Example
///
/// ```rust
/// capture_screenshot("window_capture.png", "Calculator", "png").expect("Failed to capture screenshot");
/// ```
///
/// # Errors
///
/// This function will return an `io::Error` if FFmpeg fails to start or if there is a problem
/// capturing the screenshot.
pub fn capture_screenshot(
    output_file: &str,
    window_title: &str,
    output_format: &str,
) -> io::Result<String> {
    let mut index = 0;
    let mut screenshot_path = PathBuf::from(output_file);

    while screenshot_path.exists() {
        index += 1;
        let file_name = screenshot_path.file_stem().unwrap().to_str().unwrap();
        let file_extension = screenshot_path.extension().unwrap().to_str().unwrap();
        screenshot_path =
            screenshot_path.with_file_name(format!("{}_{}.{}", file_name, index, file_extension));
    }

    let command_output = Command::new("ffmpeg")
        .args([
            "-f",
            "gdigrab",
            "-i",
            &format!("title={}", window_title), // Specify the window title
            "-vframes",
            "1",                               // Capture only one frame (a screenshot)
            screenshot_path.to_str().unwrap(), // The output file path and name, determines format
        ])
        .output()?;

    if !command_output.status.success() {
        println!(
            "FFmpeg failed to capture the window: {}",
            String::from_utf8_lossy(&command_output.stderr)
        );
        return Err(io::Error::new(
            io::ErrorKind::Other,
            "FFmpeg failed to capture the window.",
        ));
    }

    println!("Screenshot saved to {}", screenshot_path.to_str().unwrap());
    Ok(screenshot_path.to_str().unwrap().to_string())
}
