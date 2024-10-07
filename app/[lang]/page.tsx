import { getDictionary } from './dictionaries'
 
export default async function Page({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang) // ví dụ: 'en'
  return <div>{dict.login}</div> // Nút "Đăng Nhập" đa ngôn ngữ
}