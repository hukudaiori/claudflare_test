// ============================================================
// お知らせ一覧
// 新しい記事を追加するときは NEWS 配列の先頭にオブジェクトを追加してください
//
//   date  : 表示する日付（文字列）
//   title : 一覧に表示するタイトル
//   body  : ポップアップの本文（Markdown形式）
// ============================================================

const NEWS = [
  {
    date: "2026.04.21",
    title: "公式X（旧Twitter）アカウントを開設しました",
    body: `
愛好会の公式Xアカウントを開設しました。

開発進捗や、コミケ等のイベント出展情報を発信していきます。
フォローよろしくお願いします。

[公式X @tmcit_vngame](https://x.com/tmcit_vngame)
    `.trim()
  },
  {
    date: "2026.04.21",
    title: "note記事公開：愛好会の紹介及び活動方針について",
    body: `
設立の想いや今後の活動計画についての詳細記事を公開しました。

活動の詳細はぜひ記事をご覧ください。

[note記事を読む](https://note.com/tmcit_vngame/n/n0df0a68c084d)
    `.trim()
  }
];

// --- 以下は編集不要 ---
(function () {
  const list = document.getElementById('news-list');

  NEWS.forEach(function (item, i) {
    const li = document.createElement('li');
    li.innerHTML =
      '<span class="date">' + item.date + '</span>' +
      '<span class="title">' + item.title + '</span>';
    li.addEventListener('click', function () { openNewsModal(i); });
    list.appendChild(li);
  });

  function openNewsModal(i) {
    const item = NEWS[i];
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-date').textContent = item.date;
    document.getElementById('modal-body').innerHTML = marked.parse(item.body);
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('news-modal').style.display = 'block';
  }

  window.closeModal = function () {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('news-modal').style.display = 'none';
  };
})();
