import os
import subprocess
import yt_dlp
import qrcode
from PIL import Image
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask

# ------------------ UTILS ------------------

def time_to_seconds(t):
    if not t:
        return None
    parts = list(map(int, t.split(":")))
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    if len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]

# ------------------ TOOL 1 ------------------

def youtube_downloader():
    url = input("YouTube URL: ").strip()
    fmt = input("Format (mp3/mp4): ").strip().lower()

    os.makedirs("downloads", exist_ok=True)

    if fmt == "mp3":
        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": "downloads/%(title)s.%(ext)s",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }]
        }
    elif fmt == "mp4":
        ydl_opts = {
            "format": "bestvideo+bestaudio/best",
            "outtmpl": "downloads/%(title)s.%(ext)s",
            "merge_output_format": "mp4"
        }
    else:
        print("❌ Invalid format")
        return

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    print("✅ Download complete")

# ------------------ TOOL 2 ------------------

def trim_audio():
    file = input("Audio file path: ").strip()
    start = input("Start time (mm:ss or hh:mm:ss): ").strip()
    end = input("End time (mm:ss or hh:mm:ss): ").strip()

    start_sec = time_to_seconds(start)
    end_sec = time_to_seconds(end)

    if not os.path.exists(file):
        print("❌ File not found")
        return

    # Properly insert "_trimmed" before the file extension
    base, ext = os.path.splitext(file)
    output = f"{base}_trimmed{ext}"

    cmd = ["ffmpeg", "-y", "-i", file]

    if start_sec is not None:
        cmd += ["-ss", str(start_sec)]
    if end_sec is not None:
        cmd += ["-to", str(end_sec)]

    cmd.append(output)

    subprocess.run(cmd)
    print(f"✅ Trimmed file saved as {output}")


# ------------------ MENU ------------------

def main():
    while True:
        print("\n=== MEDIA TOOLKIT ===")
        print("1. Download YouTube (MP3 / MP4)")
        print("2. Trim Audio File")
        print("3. Exit")

        choice = input("Choose option: ").strip()

        if choice == "1":
            youtube_downloader()
        elif choice == "2":
            trim_audio()
        elif choice == "3":
            print("👋 Exiting")
            break
        else:
            print("❌ Invalid choice")

if __name__ == "__main__":
    main()
