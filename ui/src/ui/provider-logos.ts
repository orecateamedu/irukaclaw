import { svg } from "lit";

export function getProviderLogoSvg(modelName: string) {
  const name = modelName.toLowerCase();

  // Gemini / Google
  if (name.includes("gemini") || name.includes("google")) {
    return svg`
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    `;
  }

  // OpenAI / ChatGPT / GPT
  if (
    name.includes("gpt") ||
    name.includes("openai") ||
    name.includes("o1") ||
    name.includes("o3")
  ) {
    return svg`
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-9.5-3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v3c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-3h-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h3v-3z"/>
        <circle cx="12" cy="12" r="5" fill="var(--text)"/>
        <!-- An abstract representation of OpenAI logo -->
        <path fill="currentColor" d="M12 4.42a7.5 7.5 0 00-6.49 11.23L12 2l6.49 13.65A7.5 7.5 0 0012 4.42z" fill-opacity="0.5"/>
      </svg>
    `;
  }

  // Claude / Anthropic
  if (name.includes("claude") || name.includes("anthropic")) {
    return svg`
       <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <rect width="20" height="20" x="2" y="2" rx="4" fill="#E4D5B9"/>
        <path fill="#0F0F0F" d="M7 16h3v-5l2-2 2 2v5h3V9.5A2.5 2.5 0 0014.5 7h-5A2.5 2.5 0 007 9.5V16z"/>
      </svg>
    `;
  }

  // DeepSeek
  if (name.includes("deepseek")) {
    return svg`
       <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <circle cx="12" cy="12" r="10" fill="#0A0A0A"/>
        <path fill="#2D9CDB" d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13.5c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5 17.5 9 17.5 12 15 17.5 12 17.5z"/>
        <circle cx="12" cy="12" r="2.5" fill="#2D9CDB"/>
      </svg>
    `;
  }

  // Meta / Llama
  if (name.includes("llama") || name.includes("meta")) {
    return svg`
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <path fill="#0668E1" d="M12 3a9 9 0 00-5.87 15.82c.98-.38 1.95-.91 2.87-1.59A7 7 0 1119 12c0 1.25-.33 2.42-.9 3.44.89.65 1.83 1.15 2.77 1.5A9 9 0 0012 3zm-2.5 6a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM12 8a6 6 0 00-1.87 11.7C8.6 18.86 7.23 17.65 6.2 16.2c.86-1.52.88-3.79-.11-5.1-.38-.5-.87-.8-1.39-.9A7.95 7.95 0 0112 4c4.42 0 8 3.58 8 8 0 1.63-.48 3.15-1.3 4.41-1.02-1.35-2.31-2.48-3.76-3.26A5.96 5.96 0 0012 8z"/>
      </svg>
    `;
  }

  // XAI / Grok
  if (name.includes("grok") || name.includes("xai")) {
    return svg`
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <path fill="currentColor" d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 24h2.113l8.176-9.309L16.867 24h7.133l-9.742-13.848zM11.37 13.67l-1.03-1.444-7.468-10.45h3.243l5.88 8.23 1.03 1.444 7.828 10.957h-3.243l-6.24-8.733z"/>
      </svg>
    `;
  }

  // Mistral
  if (name.includes("mistral")) {
    return svg`
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;">
        <path fill="#F26E21" d="M12 3L2 9l10 6 10-6-10-6zm0 18l-10-6v-3.5l10 6 10-6V15l-10 6z"/>
      </svg>
    `;
  }

  return null;
}
