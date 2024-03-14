// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod list_windows;
mod screen_capture;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn capture_screen(path: String, window_title: String, format: String) -> Result<String, String> {
    println!(
        "Capturing screenshot of {} window to {}",
        window_title, path
    );
    let actual_screenshot_path: Result<String, String> =
        screen_capture::capture_screenshot(&path, &window_title, &format)
            .map_err(|e| e.to_string());
    actual_screenshot_path
}

#[tauri::command]
fn get_windows() -> Result<Vec<String>, String> {
    Ok(list_windows::list_windows())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![capture_screen, get_windows])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
