export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export async function queryOllama(prompt: string, model: string = 'gemma:4b') {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  
  try {
    const response = await fetch(`${url}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Failed to query Ollama:', error);
    return `Error: Could not connect to Ollama at ${url}. Ensure the instance is running and accessible.`;
  }
}

export async function listOllamaModels() {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  
  try {
    const response = await fetch(`${url}/api/tags`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    return [];
  }
}

export async function pullOllamaModel(name: string) {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  try {
    const response = await fetch(`${url}/api/pull`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, stream: false }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to pull model:', error);
    return false;
  }
}

export async function deleteOllamaModel(name: string) {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  try {
    const response = await fetch(`${url}/api/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to delete model:', error);
    return false;
  }
}

export async function testOllamaConnection() {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  const startTime = Date.now();
  
  try {
    // 1. Check basic connectivity and version
    const versionRes = await fetch(`${url}/api/version`);
    const latency = Date.now() - startTime;
    
    if (!versionRes.ok) {
      return {
        success: false,
        error: `Server responded with status ${versionRes.status}: ${versionRes.statusText}`,
        details: 'The Ollama server is reachable but returned an error. Check server logs.',
        latency
      };
    }
    
    const { version } = await versionRes.json();
    
    // 2. Check if any models are loaded
    const modelsRes = await fetch(`${url}/api/tags`);
    const modelsData = await modelsRes.json();
    const modelCount = modelsData.models?.length || 0;
    
    return {
      success: true,
      version,
      latency,
      modelCount,
      details: `Connected to Ollama v${version}. ${modelCount} models available. Response time: ${latency}ms.`
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    let details = 'Could not reach the Ollama server.';
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      details = `Connection refused at ${url}. Ensure Ollama is running and OLLAMA_HOST is set to 0.0.0.0 if accessing remotely.`;
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      details,
      latency
    };
  }
}
