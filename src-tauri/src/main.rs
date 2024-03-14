// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod screen_capture;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn capture_screen(path: String) -> Result<String, String> {
    let actual_screenshot_path =
        screen_capture::capture_screenshot(&path).map_err(|e| e.to_string());
    actual_screenshot_path
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![capture_screen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
