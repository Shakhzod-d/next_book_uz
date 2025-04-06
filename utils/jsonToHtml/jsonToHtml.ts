const JsonToHtml = (data: any): string => {
  let col = "";
  for (let i = 0; i < data?.length; i++) {
    if (data[i].newLine) {
      if (data[i].type === "list") {
        col += getList(data[i]);
      } else if (data[i].type === "img") {
        col += getImg(data[i]);
      } else if (data[i].type === "video") {
        col += getVideo(data[i]);
      } else if (data[i].type === "link") {
        if (i === data.length - 1) {
          col +=
            getTextOpen(data[i].size, data[i].align) +
            getLink(
              data[i].bold,
              data[i].underline,
              data[i].italic,
              data[i].strikethrought,
              data[i].href,
              data[i].value
            ) +
            getTextClose(data[i].size);
        } else {
          col += getTextOpen(data[i].size, data[i].align);
          col += getLink(
            data[i].bold,
            data[i].underline,
            data[i].italic,
            data[i].strikethrought,
            data[i].href,
            data[i].value
          );
          col += data[i + 1].newLine ? getTextClose(data[i].size) : "";
        }
      } else {
        if (i === data.length - 1) {
          col +=
            getTextOpen(data[i].size, data[i].align) +
            getText(
              data[i].bold,
              data[i].underline,
              data[i].italic,
              data[i].strikethrought,
              data[i].value
            ) +
            getTextClose(data[i].size);
        } else {
          col += getTextOpen(data[i].size, data[i].align);
          col += getText(
            data[i].bold,
            data[i].underline,
            data[i].italic,
            data[i].strikethrought,
            data[i].value
          );
          col += data[i + 1].newLine ? getTextClose(data[i].size) : "";
        }
      }
    } else {
      if (data[i].type === "list") {
        col += getList(data[i]);
      } else if (data[i].type === "img") {
        col += getImg(data[i]);
      } else if (data[i].type === "video") {
        col += getVideo(data[i]);
      } else if (data[i].type === "link") {
        if (i === data.length - 1) {
          col +=
            getLink(
              data[i].bold,
              data[i].underline,
              data[i].italic,
              data[i].strikethrought,
              data[i].href,
              data[i].value
            ) + getTextClose(data[i].size);
        } else {
          col += getLink(
            data[i].bold,
            data[i].underline,
            data[i].italic,
            data[i].strikethrought,
            data[i].href,
            data[i].value
          );
          col += data[i + 1].newLine ? getTextClose(data[i].size) : "";
        }
      } else {
        if (i === data.length - 1) {
          col +=
            getText(
              data[i].bold,
              data[i].underline,
              data[i].italic,
              data[i].strikethrought,
              data[i].value
            ) + getTextClose(data[i].size);
        } else {
          col += getText(
            data[i].bold,
            data[i].underline,
            data[i].italic,
            data[i].strikethrought,
            data[i].value
          );
          col += data[i + 1].newLine ? getTextClose(data[i].size) : "";
        }
      }
    }
  }
  return col;
};

const getList = (list: any) => {
  let col = "";
  col += list.listIndicator === "dot" ? `<ul>` : `<ol>`;
  for (let i = 0; i < list.items.length; i++) {
    if (list.items[i].newLine) {
      if (i === list.items.length - 1) {
        col += `<li>${getText(
          list.items[i].bold,
          list.items[i].underline,
          list.items[i].italic,
          list.items[i].strikethrought,
          list.items[i].value
        )}</li>`;
      } else {
        col += `<li>${getText(
          list.items[i].bold,
          list.items[i].underline,
          list.items[i].italic,
          list.items[i].strikethrought,
          list.items[i].value
        )}${list.items[i + 1].newLine ? "</li>" : ""}`;
      }
    } else {
      if (i === list.items.length - 1) {
        col += `${getText(
          list.items[i].bold,
          list.items[i].underline,
          list.items[i].italic,
          list.items[i].strikethrought,
          list.items[i].value
        )}</li>`;
      } else {
        col += `${getText(
          list.items[i].bold,
          list.items[i].underline,
          list.items[i].italic,
          list.items[i].strikethrought,
          list.items[i].value
        )}${list.items[i + 1].newLine ? "</li>" : ""}`;
      }
    }
  }
  col += list.listIndicator === "dot" ? `</ul>` : `<ol>`;
  return col;
};

const getImg = (img: any) => {
  return `<p><img src="${process.env.NEXT_PUBLIC_BASE_URL}${img.value}" style="max-width: 100px;"></img></p>`;
};
const getVideo = (video: any) => {
  return `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${video.value}"></iframe>`;
};

const getLink = (
  bold: string,
  underline: string,
  italic: string,
  strikethrought: string,
  href: string,
  value: any
) => {
  return `<a href="${href}">${getText(
    bold,
    underline,
    italic,
    strikethrought,
    value
  )}</a>`;
};

const getTextOpen = (size: number, align: string) => {
  return `${
    size === 32
      ? "<h1"
      : size === 24
      ? "<h2"
      : size === 18.72
      ? "<h3"
      : size === 16
      ? "<h4"
      : "<p"
  }${align !== "left" ? ' class="text-' + align + '"' : ""}${">"}`;
};

const getTextClose = (size: number) => {
  return `${
    size === 32
      ? "</h1> <br/>"
      : size === 24
      ? "</h2> <br/>"
      : size === 18.72
      ? "</h3> <br/>"
      : size === 16
      ? "</h4> <br/>"
      : "</p> <br/>"
  }`;
};

const getText = (
  bold: string,
  underline: string,
  italic: string,
  strikethrought: string,
  value: any
) => {
  return `${bold ? "<strong>" : ""}${underline ? "<u>" : ""}${
    italic ? "<em>" : ""
  }${strikethrought ? "<s>" : ""}${value}${strikethrought ? "</s>" : ""}${
    italic ? "</em>" : ""
  }${underline ? "</u>" : ""}${bold ? "</strong>" : ""}`;
};

export default JsonToHtml;
