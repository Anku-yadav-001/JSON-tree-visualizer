"use client";

import React, { useState, useRef } from "react";
import { SAMPLE_JSON, SAMPLE_JSONS } from "@/constants/sampleJSON";
import { parseJSON } from "@/lib/jsonParser";
import { formatJSON } from "@/lib/utils";
import { Play, Code, Trash2 } from "lucide-react";
import { Button } from "../common/Button";
import { Textarea } from "../common/Textarea";

interface JSONInputProps {
    onValidJSON: (data: any) => void;
    onError: (error: string) => void;
}

export const JSONInput: React.FC<JSONInputProps> = ({ onValidJSON, onError }) => {
    const [jsonText, setJsonText] = useState(SAMPLE_JSON);
    const [error, setError] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleVisualize = () => {
        const result = parseJSON(jsonText);

        if (result.success && result.data) {
            setError("");
            onValidJSON(result.data);
        } else {
            const errorMsg = result.error || "Invalid JSON";
            setError(errorMsg);
            onError(errorMsg);
        }
    };

    const handleFormat = () => {
        try {
            const formatted = formatJSON(jsonText);
            setJsonText(formatted);
            setError("");
        } catch {
            setError("Cannot format invalid JSON");
        }
    };

    const handleClear = () => {
        setJsonText("");
        setError("");
    };

    const handleLoadSample = (type: keyof typeof SAMPLE_JSONS) => {
        setJsonText(SAMPLE_JSONS[type]);
        setError("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value } = textarea;
        const key = e.key;

        const closingPairs: { [key: string]: string } = {
            "{": "}",
            "[": "]",
            '"': '"',
            "'": "'",
        };

        if (closingPairs[key]) {
            const hasSelection = selectionStart !== selectionEnd;

            if (hasSelection) {
                e.preventDefault();
                const selectedText = value.substring(selectionStart, selectionEnd);
                const newText =
                    value.substring(0, selectionStart) +
                    key +
                    selectedText +
                    closingPairs[key] +
                    value.substring(selectionEnd);

                setJsonText(newText);

                setTimeout(() => {
                    textarea.selectionStart = selectionStart + 1;
                    textarea.selectionEnd = selectionEnd + 1;
                }, 0);
            } else {
                if ((key === '"' || key === "'") && value[selectionStart] === key) {
                    e.preventDefault();
                    textarea.selectionStart = selectionStart + 1;
                    textarea.selectionEnd = selectionStart + 1;
                    return;
                }

                e.preventDefault();
                const newText =
                    value.substring(0, selectionStart) +
                    key +
                    closingPairs[key] +
                    value.substring(selectionEnd);

                setJsonText(newText);

                setTimeout(() => {
                    textarea.selectionStart = selectionStart + 1;
                    textarea.selectionEnd = selectionStart + 1;
                }, 0);
            }
        }
        else if (
            (key === "}" || key === "]" || key === '"' || key === "'") &&
            value[selectionStart] === key
        ) {
            e.preventDefault();
            textarea.selectionStart = selectionStart + 1;
            textarea.selectionEnd = selectionStart + 1;
        }
        else if (key === "Backspace" && selectionStart === selectionEnd) {
            const charBefore = value[selectionStart - 1];
            const charAfter = value[selectionStart];

            const pairs: { [key: string]: string } = {
                "{": "}",
                "[": "]",
                '"': '"',
                "'": "'",
            };

            if (pairs[charBefore] === charAfter) {
                e.preventDefault();
                const newText =
                    value.substring(0, selectionStart - 1) +
                    value.substring(selectionStart + 1);

                setJsonText(newText);

                setTimeout(() => {
                    textarea.selectionStart = selectionStart - 1;
                    textarea.selectionEnd = selectionStart - 1;
                }, 0);
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">JSON Input</h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFormat}
                        title="Format JSON"
                    >
                        <Code className="h-4 w-4 mr-2" />
                        Format
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                        title="Clear input"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                    </Button>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Samples:</span>
                {Object.keys(SAMPLE_JSONS).map((key) => (
                    <button
                        key={key}
                        onClick={() => handleLoadSample(key as keyof typeof SAMPLE_JSONS)}
                        className="text-xs px-2 py-1 rounded bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                        {key}
                    </button>
                ))}
            </div>

            <Textarea
                ref={textareaRef}
                value={jsonText}
                onChange={(e) => {
                    setJsonText(e.target.value);
                    setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="Paste or type your JSON here..."
                className="font-mono text-sm min-h-[500px]"
                spellCheck={false}
            />

            {error && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
                    <p className="text-sm text-destructive font-medium">Error:</p>
                    <p className="text-sm text-destructive/90 mt-1">{error}</p>
                </div>
            )}

            <Button
                onClick={handleVisualize}
                className="w-full"
                size="lg"
                disabled={!jsonText.trim()}
            >
                <Play className="h-5 w-5 mr-2" />
                Generate Tree
            </Button>
        </div>
    );
};