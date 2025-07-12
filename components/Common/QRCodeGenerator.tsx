'use client';
import React, { useState, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Download, Settings, Sparkles, QrCode } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AdvancedOptions from '@/components/Common/AdvancedOptions';
import DesignSelector from '@/components/Common/DesignSelector';
import QRDisplayWrapper from '@/components/Common/QRDisplayWrapper';

const QRCodeGenerator = () => {
  const [qrValue, setQRValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [textBelow, setTextBelow] = useState('');
  const [logo, setLogo] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [resolution, setResolution] = useState(1000);
  const [selectedDesign, setSelectedDesign] = useState('default');
  const qrCodeRef = useRef<any>(null);
  const previewSize = 280;

  const generateQRCode = () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setQRValue(inputValue);
      setIsGenerating(false);
    }, 500);
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  const generateQRCodeImage = useCallback(() => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      
      // Get the actual rendered QR display wrapper
      const qrDisplayElement = qrCodeRef.current;
      if (!qrDisplayElement) {
        resolve(null);
        return;
      }

      // Use html-to-image to capture the styled QR code
      import('html-to-image').then(htmlToImage => {
        htmlToImage.toPng(qrDisplayElement, {
          quality: 1,
          pixelRatio: resolution / 280, // Scale based on resolution setting
          backgroundColor: 'white',
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }
        }).then(dataUrl => {
          resolve(dataUrl);
        }).catch(error => {
          console.error('Error generating image:', error);
          // Fallback to basic canvas method
          canvas.width = resolution;
          canvas.height = resolution + (textBelow ? resolution * 0.15 : 0);
          const ctx:any = canvas.getContext('2d');
          
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          const qrSize = resolution * 0.8;
          const qrPosition = (resolution - qrSize) / 2;
          const svgString = new XMLSerializer().serializeToString(qrDisplayElement.querySelector('svg'));
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, qrPosition, qrPosition, qrSize, qrSize);
            
            if (textBelow) {
              const fontSize = resolution * 0.04;
              ctx.font = `600 ${fontSize}px Inter, sans-serif`;
              ctx.fillStyle = '#1f2937';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              const textY = qrPosition + qrSize + (resolution * 0.04);
              ctx.fillText(textBelow, resolution / 2, textY);
            }
            
            resolve(canvas.toDataURL('image/png'));
          };
          img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
        });
      });
    });
  }, [resolution, textBelow, selectedDesign]);

  

  const saveAsPNG = async () => {
    try {
      const dataUrl = await generateQRCodeImage();
      const link:any = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = dataUrl;
      link.click();
      toast.success("QR Code saved as PNG!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save QR Code");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8 lg:mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0  rounded-full blur-xl animate-pulse"></div>
            <div className="relative  p-4 rounded-full">
              <img src="/qrcode.png" className="h-16 w-auto text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-playfair font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
          QR Code Generator
        </h1>
        <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
           Create, customize, and download QR codes in seconds - completely free!
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <Card className="shadow-medium border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Generator Settings
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your text, URL, or message..."
                    className="text-lg py-6 pr-12 border-2 border-muted focus:border-primary transition-all duration-300 bg-background/50"
                  />
                  <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                
                <Button 
                  onClick={generateQRCode} 
                  className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isGenerating || !inputValue.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Magic...
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-5 w-5" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="advanced-options" className="border border-muted rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center text-foreground">
                      <Settings className="w-4 h-4 mr-2" />
                      <span className="font-medium">Advanced Options</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <AdvancedOptions
                      text={textBelow}
                      setText={setTextBelow}
                      logo={logo}
                      setLogo={setLogo}
                      showLogo={showLogo}
                      setShowLogo={setShowLogo}
                      resolution={resolution}
                      setResolution={setResolution}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Design Selector */}
          <DesignSelector 
            selectedDesign={selectedDesign}
            onDesignChange={setSelectedDesign}
          />
        </div>

        {/* Right Column - QR Code Preview */}
        <div className="space-y-6">
          <Card className="shadow-medium border-0 bg-card/80 backdrop-blur-sm min-h-[500px] flex flex-col">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <QrCode className="h-6 w-6 text-primary" />
                Your QR Code
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              {qrValue ? (
                <div className="space-y-8 animate-fade-in w-full">
                  <div className="flex justify-center">
                    <div ref={qrCodeRef} className="transition-all duration-300 hover:shadow-medium animate-float">
                      <QRDisplayWrapper
                        design={selectedDesign}
                        qrValue={qrValue}
                        previewSize={previewSize}
                        showLogo={showLogo}
                        logo={logo}
                        textBelow={textBelow}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    
                    <Button 
                      onClick={saveAsPNG} 
                      variant="outline"
                      className="flex items-center gap-2 px-6 py-3 border-2 border-blue-400 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 text-muted-foreground">
                  <div className="w-32 h-32 mx-auto border-2 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center">
                    <QrCode className="h-16 w-16 opacity-30" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">No QR Code yet</p>
                    <p className="text-sm">Enter your content and click generate to see your QR code here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;