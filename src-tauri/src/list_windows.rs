extern crate winapi;

use std::ffi::OsString;
use std::os::windows::ffi::OsStringExt;
use winapi::shared::minwindef::{BOOL, LPARAM, TRUE};
use winapi::um::winuser::{EnumWindows, GetWindowTextW, IsWindowVisible};

extern "system" fn enum_windows_callback(
    hwnd: winapi::shared::windef::HWND,
    lparam: LPARAM,
) -> BOOL {
    let mut title = [0u16; 256]; // Buffer for window title
    unsafe {
        if IsWindowVisible(hwnd) > 0 {
            let len = GetWindowTextW(hwnd, title.as_mut_ptr(), title.len() as i32);
            if len > 0 {
                let window_title = OsString::from_wide(&title[..len as usize])
                    .into_string()
                    .unwrap_or_else(|_| "".to_string());
                let titles = &mut *(lparam as *mut Vec<String>);
                titles.push(window_title);
            }
        }
    }
    TRUE
}

pub fn list_windows() -> Vec<String> {
    let mut titles: Vec<String> = Vec::new();
    unsafe {
        EnumWindows(Some(enum_windows_callback), &mut titles as *mut _ as LPARAM);
    }
    titles
}
