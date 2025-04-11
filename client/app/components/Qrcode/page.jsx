import QRCode from "react-qr-code";

const EmailQrCode = ({email, subject, body}) => {
    const qrValue = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    return(
        <div>
            <QRCode value={qrValue}></QRCode>
        </div>
    )
}

export default EmailQrCode