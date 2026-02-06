import qrcode
import os

url = "https://soumilidasclg.github.io/myoband-website/"
output_path = "assets/website-qr-code.png"

# Ensure assets directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Generate QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save(output_path)
print(f"QR code generated at {output_path}")
