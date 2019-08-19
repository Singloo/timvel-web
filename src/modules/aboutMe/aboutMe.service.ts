import { apiClient } from '../../utils';
import Marked from 'marked';
const TEXTS = {
  zh: {
    name: '杨同学',
    codingExp: '编程经验',
    unit: {
      y: '年',
      m: '月',
      d: '天',
      h: '小时',
      min: '分钟',
      s: '秒',
    },
  },
  en: {
    name: 'Rick Sanchez',
    codingExp: 'Coding Experience',
    unit: {
      y: 'years',
      m: 'months',
      d: 'days',
      h: 'hours',
      min: 'minutes',
      s: 'seconds',
    },
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
