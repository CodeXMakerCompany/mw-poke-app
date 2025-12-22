import https from "https";

type HTTP_METHODS = "GET" | "POST" | "PUT" | "DELETE";

export type HttpResponse<T> = {
  statusCode: number;
  data: T;
};

class HttpInvoker {
  async call<T>(url: string, method: HTTP_METHODS): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      const req = https.request(url, { method }, (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            const parsed = body ? JSON.parse(body) : null;

            resolve({
              statusCode: res.statusCode ?? 500,
              data: parsed as T,
            });
          } catch {
            reject(new Error("Invalid JSON response"));
          }
        });
      });

      req.on("error", reject);
      req.end();
    });
  }
}

export default new HttpInvoker();
