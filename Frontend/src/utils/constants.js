import { 
  FaReact, FaVuejs, FaAngular, FaHtml5, FaCss3Alt, FaSass, 
  FaNodeJs, FaPython, FaPhp, FaJava, FaDatabase, FaGithub,
  FaGitAlt, FaDocker, FaAws, FaLinux, FaNpm, FaFigma,
  FaAndroid, FaApple, FaMobile
} from 'react-icons/fa';
import {
  BiLogoTypescript, BiLogoJavascript, BiLogoPostgresql,
  BiLogoMongodb, BiCodeAlt, BiGitBranch, BiServer
} from 'react-icons/bi';
import {
  BsFillBootstrapFill, BsKanban, BsTerminalFill, 
  BsPaletteFill, BsPencilFill, BsLightbulbFill
} from 'react-icons/bs';
import {
  HiUserGroup, HiClock, HiLightBulb, HiClipboardList,
  HiPuzzle, HiChat, HiAcademicCap
} from 'react-icons/hi';
import {
  SiPandas, SiNumpy, SiScikitlearn, SiTensorflow,
  SiKeras, SiPytorch, SiApachespark, SiTalend,
  SiJupyter
} from 'react-icons/si';
import { DiPython } from 'react-icons/di';
import { VscGraph } from 'react-icons/vsc';

export const TECH_STACK = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Express',
  'MongoDB', 'PostgreSQL', 'TypeScript', 'JavaScript', 'Python',
  'Django', 'PHP', 'Laravel', 'Docker', 'AWS', 'Firebase',
  'Redux', 'GraphQL', 'REST API', 'Tailwind CSS', 'SASS',
  'Git', 'CI/CD', 'Jest', 'React Native', 'Flutter'
];

export const ICONS = {
  frontend: [
    { name: 'React', icon: FaReact, color: 'blue-500' },
    { name: 'Vue', icon: FaVuejs, color: 'green-500' },
    { name: 'Angular', icon: FaAngular, color: 'red-500' },
    { name: 'JavaScript', icon: BiLogoJavascript, color: 'yellow-500' },
    { name: 'HTML5', icon: FaHtml5, color: 'orange-500' },
    { name: 'CSS3', icon: FaCss3Alt, color: 'blue-400' },
    { name: 'Sass', icon: FaSass, color: 'pink-500' },
    { name: 'TypeScript', icon: BiLogoTypescript, color: 'blue-600' },
    { name: 'Bootstrap', icon: BsFillBootstrapFill, color: 'purple-500' },
    { name: 'Code', icon: BiCodeAlt, color: 'purple-600' }
  ],
  backend: [
    { name: 'Node.js', icon: FaNodeJs, color: 'green-600' },
    { name: 'Python', icon: FaPython, color: 'blue-500' },
    { name: 'PHP', icon: FaPhp, color: 'purple-500' },
    { name: 'Java', icon: FaJava, color: 'red-500' },
    { name: 'Database', icon: FaDatabase, color: 'gray-500' },
    { name: 'MongoDB', icon: BiLogoMongodb, color: 'green-500' },
    { name: 'PostgreSQL', icon: BiLogoPostgresql, color: 'blue-600' },
    { name: 'Server', icon: BiServer, color: 'red-500' },
    { name: 'Terminal', icon: BsTerminalFill, color: 'green-400' }
  ],
  tools: [
    { name: 'Git', icon: FaGitAlt, color: 'orange-600' },
    { name: 'GitHub', icon: FaGithub, color: 'gray-900' },
    { name: 'Docker', icon: FaDocker, color: 'blue-500' },
    { name: 'AWS', icon: FaAws, color: 'yellow-600' },
    { name: 'Linux', icon: FaLinux, color: 'gray-700' },
    { name: 'NPM', icon: FaNpm, color: 'red-500' },
    { name: 'Git Branch', icon: BiGitBranch, color: 'red-400' },
    { name: 'Tasks', icon: BsKanban, color: 'blue-500' },
    { name: 'Talend', icon: SiTalend, color: 'green-500' }
  ],
  design: [
    { name: 'Figma', icon: FaFigma, color: 'purple-500' },
    { name: 'Palette', icon: BsPaletteFill, color: 'pink-500' },
    { name: 'Pen', icon: BsPencilFill, color: 'orange-600' }
  ],
  mobile: [
    { name: 'Android', icon: FaAndroid, color: 'green-500' },
    { name: 'Apple', icon: FaApple, color: 'gray-700' },
    { name: 'Mobile', icon: FaMobile, color: 'blue-500' }
  ],
  soft: [
    { name: 'Communication', icon: HiChat, color: 'blue-500' },
    { name: 'Leadership', icon: HiAcademicCap, color: 'purple-500' },
    { name: 'Problem Solving', icon: HiPuzzle, color: 'green-500' },
    { name: 'Teamwork', icon: HiUserGroup, color: 'indigo-500' },
    { name: 'Time Management', icon: HiClock, color: 'amber-500' },
    { name: 'Innovation', icon: HiLightBulb, color: 'yellow-500' },
    { name: 'Organization', icon: HiClipboardList, color: 'red-500' },
    { name: 'Ideas', icon: BsLightbulbFill, color: 'rose-500' }
  ],
  datascience: [
    { name: 'Python', icon: DiPython, color: 'blue-500' },
    { name: 'Pandas', icon: SiPandas, color: 'purple-600' },
    { name: 'NumPy', icon: SiNumpy, color: 'blue-400' },
    { name: 'Matplotlib', icon: VscGraph, color: 'orange-500' },
    { name: 'Scikit-Learn', icon: SiScikitlearn, color: 'orange-600' },
    { name: 'TensorFlow', icon: SiTensorflow, color: 'orange-500' },
    { name: 'Jupyter', icon: SiJupyter, color: 'orange-600' }
  ],
  deeplearning: [
    { name: 'Keras', icon: SiKeras, color: 'red-500' },
    { name: 'PyTorch', icon: SiPytorch, color: 'orange-500' },
    { name: 'TensorFlow', icon: SiTensorflow, color: 'orange-500' }
  ],
  etl: [
    { name: 'Talend', icon: SiTalend, color: 'green-500' },
    { name: 'PySpark', icon: SiApachespark, color: 'orange-500' },
    { name: 'Python', icon: DiPython, color: 'blue-500' }
  ]
};

export const SKILL_CATEGORIES = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'datascience', label: 'Data Science' },
  { value: 'deeplearning', label: 'Deep Learning' },
  { value: 'etl', label: 'ETL & Data Integration' },
  { value: 'tools', label: 'Development Tools' },
  { value: 'design', label: 'Design' },
  { value: 'soft', label: 'Soft Skills' }
];

export const PROJECT_CATEGORIES = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'api', label: 'API/Backend' }
];

export const EMPLOYMENT_TYPES = [
  { value: 'CDI', label: 'Full Time (CDI)' },
  { value: 'CDD', label: 'Contract (CDD)' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Stage', label: 'Internship' },
  { value: 'Alternance', label: 'Work-Study' }
];

export const COLOR_THEMES = [
  { value: 'violet', label: 'Violet', class: 'bg-violet-500' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'teal', label: 'Teal', class: 'bg-teal-500' },
  { value: 'amber', label: 'Amber', class: 'bg-amber-500' },
  { value: 'rose', label: 'Rose', class: 'bg-rose-500' },
  { value: 'emerald', label: 'Emerald', class: 'bg-emerald-500' }
];
