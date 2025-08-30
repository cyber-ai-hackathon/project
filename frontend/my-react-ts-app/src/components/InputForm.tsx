import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

const InputForm: React.FC = () => {
  const [formData, setFormData] = useState({
    houkokuSha: "",
    client: "",
    houkokuShomei: "",
    category: "",
    scenarioHonbun: "",
    chuiTenHoketsu: "",
    sankouShiryo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 必須チェック
    const requiredFields = [
        { name: "houkokuSha", label: "担当者名" },
        { name: "client", label: "クライアント名" },
        { name: "houkokuShomei", label: "担当案件名" },
        { name: "scenarioHonbun", label: "ノウハウ本文" },
    ];

    const emptyFields = requiredFields.filter(
        (field) => !formData[field.name as keyof typeof formData].trim()
    );

    if (emptyFields.length > 0) {
        const names = emptyFields.map((f) => f.label).join(", ");
        alert(`以下の必須項目を入力してください: ${names}`);
        return;
    }

    // バリデーション通過後
    console.log("フォームデータ:", formData);
    alert("フォームが送信されました！コンソールを確認してください。");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">属人化解消ページ</h1>
      <h2 className="form-subtitle">入力フォーム</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="担当者名"
          name="houkokuSha"
          value={formData.houkokuSha}
          onChange={handleChange}
          required
        />
        <InputField
          label="クライアント名"
          name="client"
          value={formData.client}
          onChange={handleChange}
          required
        />
        <InputField
          label="担当案件名"
          name="houkokuShomei"
          value={formData.houkokuShomei}
          onChange={handleChange}
          required
        />
        <SelectField
          label="カテゴリ"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            "リスティング広告（Google / Yahoo）",
            "SNS広告（Instagram / Facebook / TikTok など）",
            "ディスプレイ広告（GDN / YDN）",
            "SEO / コンテンツマーケティング",
            "クリエイティブ制作（バナー / LP / 動画）",
            "メディアプランニング",
            "データ分析 / レポーティング",
            "その他",
          ]}
        />
        <InputField
          label="ノウハウ本文"
          name="scenarioHonbun"
          value={formData.scenarioHonbun}
          onChange={handleChange}
          multiline
          required
          placeholder="ここにノウハウ本文を入力してください"
        />
        <InputField
          label="注意点・補足"
          name="chuiTenHoketsu"
          value={formData.chuiTenHoketsu}
          onChange={handleChange}
          multiline
          placeholder="補足や注意点を入力してください"
        />
        <InputField
          label="参照資料"
          name="sankouShiryo"
          value={formData.sankouShiryo}
          onChange={handleChange}
          placeholder="例: URLやファイル名など"
        />
        <button type="submit" className="submit-button">
          情報を送信する
        </button>
      </form>
    </div>
  );
};

export default InputForm;
