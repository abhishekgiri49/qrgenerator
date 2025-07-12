import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRDisplayWrapper = ({
  design,
  qrValue,
  previewSize,
  showLogo,
  logo,
  textBelow,
}: any) => {
  const renderQRCode = (size = previewSize, className = "") => (
    <QRCodeSVG
      value={qrValue}
      size={size}
      level="H"
      className={className}
      imageSettings={
        showLogo && logo
          ? {
              src: logo,
              x: undefined,
              y: undefined,
              height: Math.round(size * 0.16),
              width: Math.round(size * 0.16),
              excavate: true,
            }
          : undefined
      }
    />
  );

  const renderTextBelow = () =>
    textBelow && (
      <div className="text-center text-base font-semibold text-foreground/80 px-4 w-full mt-4 overflow-hidden">
        <p className="break-words whitespace-normal word-break-word max-w-[16rem]">
          {textBelow}
        </p>
      </div>
    );

  switch (design) {
    case "framed":
      return (
        <div className="bg-black p-8 rounded-2xl shadow-soft">
          <div className="bg-white p-6  rounded-xl max-w-full">
            {renderQRCode()}
            {renderTextBelow()}
          </div>
        </div>
      );

    case "rounded":
      return (
        <div className="p-8 bg-background rounded-3xl shadow-soft border border-muted/50 max-w-full">
          {renderQRCode(previewSize, "rounded-2xl")}
          {renderTextBelow()}
        </div>
      );

    case "minimal":
      return (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm max-w-full">
          {renderQRCode()}
          {renderTextBelow()}
        </div>
      );

    case "badge":
      return (
        <div className="bg-black p-8 rounded-2xl shadow-soft flex flex-col items-center max-w-full">
          <div className="bg-white p-6 rounded-xl mb-4">{renderQRCode()}</div>
          {textBelow && (
            <div className="bg-white px-6 py-2 rounded-full text-black font-semibold text-sm max-w-full break-words">
              {textBelow}
            </div>
          )}
        </div>
      );

    case "card":
      return (
        <div className="bg-white p-8 rounded-2xl shadow-soft border-2 border-gray-200 max-w-sm mx-auto w-full">
          <div className="text-center mb-4">{renderQRCode()}</div>
          {textBelow && (
            <div className="text-center">
              <div className="h-px bg-gray-200 mb-3"></div>
              <div className="text-gray-700 font-medium text-sm break-words">
                {textBelow}
              </div>
            </div>
          )}
        </div>
      );

    case "scan-me":
      return (
        <div className="bg-white p-8 rounded-2xl shadow-soft border-4 border-black max-w-sm mx-auto w-full">
          <div className="text-center mb-4">{renderQRCode()}</div>
          <div className="bg-black text-white py-3 px-6 rounded-lg text-center">
            <div className="font-bold text-lg tracking-wider">SCAN ME</div>
            {textBelow && (
              <div className="text-sm font-medium mt-1 opacity-90 break-words">
                {textBelow}
              </div>
            )}
          </div>
        </div>
      );

    case "gradient":
      return (
        <div className="bg-gradient-to-br from-blue-300 to-blue-500 p-8 rounded-3xl shadow-soft max-w-full">
          <div className="bg-white p-6 rounded-2xl">
            {renderQRCode()}
            {renderTextBelow()}
          </div>
        </div>
      );

    case "shadow":
      return (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-muted/20 max-w-full">
          {renderQRCode()}
          {renderTextBelow()}
        </div>
      );

    case "modern":
      return (
        <div className="bg-blue-900 p-8 rounded-3xl shadow-soft max-w-full">
          <div className="bg-white p-6 rounded-2xl mb-4">{renderQRCode()}</div>
          {textBelow && (
            <div className="text-black bg-white py-2 text-center border max-w-[21rem] rounded-2xl font-semibold text-lg break-words">
              {textBelow}
            </div>
          )}
        </div>
      );

    case "neon":
      return (
        <div className="relative bg-black p-8 rounded-2xl shadow-soft max-w-full">
          <div className="absolute inset-2 bg-blue-300 rounded-xl blur-xl"></div>
          <div className="relative bg-white p-6 rounded-xl">
            {renderQRCode()}
            {renderTextBelow()}
          </div>
        </div>
      );

    case "classic":
      return (
        <div className="bg-white p-8 rounded-lg shadow-soft border-4 border-black max-w-sm mx-auto w-full">
          <div className="text-center mb-4">{renderQRCode()}</div>
          <div className="bg-black text-white py-2 px-4 text-center font-bold text-sm uppercase tracking-widest break-words">
            {textBelow || "QR Code"}
          </div>
        </div>
      );

    default: // 'default'
      return (
        <div className="p-8 bg-background rounded-2xl shadow-soft border border-muted/50 max-w-full">
          {renderQRCode()}
          {renderTextBelow()}
        </div>
      );
  }
};

export default QRDisplayWrapper;