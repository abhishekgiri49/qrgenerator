import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

const DesignSelector = ({ selectedDesign, onDesignChange }:any) => {
  const designs = [
    { id: 'default', name: 'Default', preview: '⬜' },
    { id: 'framed', name: 'Framed', preview: '🖼️' },
    { id: 'rounded', name: 'Rounded', preview: '🔲' },
    { id: 'minimal', name: 'Minimal', preview: '📄' },
    { id: 'badge', name: 'Badge', preview: '🏷️' },
    { id: 'card', name: 'Card', preview: '🎴' },
    { id: 'scan-me', name: 'Scan Me', preview: '👁️' },
    { id: 'gradient', name: 'Gradient', preview: '🌈' },
    { id: 'shadow', name: 'Shadow', preview: '🔳' },
    { id: 'modern', name: 'Modern', preview: '⚡' },
    { id: 'neon', name: 'Neon', preview: '💫' },
    { id: 'classic', name: 'Classic', preview: '📰' }
  ];

  return (
    <Card className="shadow-medium border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          Design Styles
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <RadioGroup value={selectedDesign} onValueChange={onDesignChange}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {designs.map((design) => (
              <div key={design.id} className={`relative  ${
                selectedDesign === design.id
                  ? 'border-primary bg-black/20 shadow-md'
                  : 'border-muted hover:border-black/40 hover:bg-muted/30'
              }`}>
                <RadioGroupItem 
                  value={design.id} 
                  id={design.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={design.id}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-muted hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 cursor-pointer transition-all duration-200 hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl mb-3 border-2 border-primary/20">
                    {design.preview}
                  </div>
                  <span className="text-sm font-medium text-center">{design.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default DesignSelector;
