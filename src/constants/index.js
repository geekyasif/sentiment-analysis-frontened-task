export const tableColumn = [
  {
    title: "News Urls",
    dataIndex: "url",
    key: "url",
    render: (text) => (
      <a href={text} target="=_blank">
        {text}
      </a>
    ),
  },
  {
    title: "Sentiments",
    dataIndex: "sentiment",
    key: "sentiment",
    render: (text) => (
      <p
        className={`${
          text === "Positive"
            ? "text-green-500"
            : text === "Negative"
            ? "text-red-500"
            : "text-yellow-500"
        }`}
      >
        {text}
      </p>
    ),
  },
];
