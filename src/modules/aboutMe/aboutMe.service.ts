import { apiClient } from '../../utils';
import Marked from 'marked';
const TEXTS = {
  zh: {
    name: '杨同学',
  },
  en: {
    name: 'Rick Sanchez',
  },
};
class TemplateService {
  requireMd = async (path: string) => {
    const res = await fetch(path);
    return Marked(await res.text());
  };
  getText = (lang: 'zh' | 'en') => TEXTS[lang];
}

export default new TemplateService();
export { TemplateService as AboutMe };
