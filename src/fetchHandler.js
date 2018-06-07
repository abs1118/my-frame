import { message } from "antd";

function urlencoded(data) {
  return Object.keys(data)
    .filter(key => data[key] !== undefined && data[key] !== null)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export function Get(url, options) {
  const data = (options && options.data) || {};
  options && delete options.data;
  const query = urlencoded(data);
  return fetch(
    query ? `${url}?${query}` : url,
    Object.assign(
      {
        method: "get",
        credentials: "include"
      },
      options
    )
  ).then(res => {
    const data = res.json();
    if (data.redirect) {
      window.location.replace(data.redirect);
    }
    return data;
  });
}

export function Delete(url, options) {
  return fetch(
    url,
    Object.assign(
      {
        method: "delete",
        credentials: "include"
      },
      options
    )
  ).then(res => {
    const data = res.json();
    if (data.redirect) {
      window.location.replace(data.redirect);
    }
    return data;
  });
}

export function Post(url, options) {
  let target = document.getElementById("_csrf");
  let csrfObj = {};
  let _csrfName = target.name;
  let _csrfValue = target.value;
  csrfObj[_csrfName] = _csrfValue;
  Object.assign(options, csrfObj);
  const data = urlencoded(options);
  return fetch(
    url,
    Object.assign(
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      { body: data }
    )
  ).then(res => {
    const data = res.json();
    if (data.redirect) {
      window.location.replace(data.redirect);
    }
    return data;
  });
}

export function PostForm(url, datas) {
  const formData = new FormData();
  Object.keys(datas).forEach(key => {
    formData.append(key, datas[key]);
  });
  return fetch(url, {
    method: "post",
    credentials: "include",
    body: formData
  }).then(res => {
    const data = res.json();
    if (data.redirect) {
      window.location.replace(data.redirect);
    }
    return data;
  });
}

export function PostMultiForm(url, datas) {
  const formData = new FormData();
  datas.forEach(item => {
    formData.append(item.key, item.value);
  });
  return fetch(url, {
    method: "post",
    credentials: "include",
    body: formData
  }).then(res => {
    const data = res.json();
    if (data.redirect) {
      window.location.replace(data.redirect);
    }
    return data;
  });
}

export function PostJson(url, datas) {
  let target = document.getElementById("_csrf");
  let csrfObj = {};
  let _csrfName = target.name;
  let _csrfValue = target.value;
  csrfObj[_csrfName] = _csrfValue;
  Object.assign(datas, csrfObj);
  return fetch(url, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datas)
  }).then(res => {
    const data = res.json();
    if (data.redirect) {
      window.location.replace(data.redirect);
    }
    return data;
  });
}

export async function download(uri, options) {
  try {
    const { filename } = options;
    delete options.filename;
    const res = await fetch(
      uri,
      Object.assign(
        {
          // mode: "no-cors",
          method: "get",
          credentials: "include"
        },
        options
      )
    );

    if (res.url.endsWith("/login")) {
      window.location.replace(
        `${res.url}?return=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    if (
      res.headers.get("content-type").indexOf("application/octet-stream") != -1
    ) {
      const blob = await res.blob();
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      return { success: true };
    }
    return res.data.json();
  } catch (e) {
    console.log(e);
  }
  return { success: false };
}

export function upload(url, formData, listen = {}, method, header) {
  return new Promise((resolve, reject) => {
    let xhr;
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    listen.progress &&
      xhr.upload.addEventListener("progress", listen.progress, false);
    listen.load && xhr.addEventListener("load", listen.load, false);
    listen.abort && xhr.addEventListener("abort", listen.abort, false);
    xhr.addEventListener(
      "error",
      err => {
        !!listen.error && listen.error(err);
        reject(err);
      },
      false
    );
    if (header) {
      for (let key in header) {
        xhr.setRequestHeader(key, header[key]);
      }
    }
    xhr.open(method, url);
    formData ? xhr.send(formData) : xhr.send();
    xhr.onreadystatechange = () => {
      if (
        ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) &&
        xhr.readyState == 4
      ) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          reject(e);
        }
      }
    };
  });
}

export async function downloadByIframe(uri, options, hideOnload) {
  const data = options || {};
  const query = urlencoded(data);
  const downloadUrl = query ? `${uri}?${query}` : uri;

  let body = document.body;
  const iframe = document.getElementById("crestDownLoadIFrame") || "";
  if (iframe) {
    body.removeChild(iframe);
  }
  let _iframe = document.createElement("iframe");
  _iframe.id = "crestDownLoadIFrame";
  _iframe.style.display = "none";
  _iframe.src = downloadUrl;
  if (!hideOnload) {
    if (_iframe.attachEvent) {
      _iframe.attachEvent("onload", function(e) {
        handleDownLoad(body, _iframe);
      });
    } else {
      _iframe.onload = function(e) {
        handleDownLoad(body, _iframe);
      };
    }
  }
  body.appendChild(_iframe);

  function handleDownLoad(body, iframe) {
    let iframeDoc =
      iframe.contentDocument ||
      (iframe.contentWindow && iframe.contentWindow.document);
    let tipText = "";
    if (iframeDoc.body.innerText) {
      try {
        tipText = JSON.parse(iframeDoc.body.innerText).msg;
      } catch (e) {
        tipText = iframeDoc.body.innerText;
      }
      message.error(tipText || "下载文件失败");
    }
    body.removeChild(iframe);
  }
}
