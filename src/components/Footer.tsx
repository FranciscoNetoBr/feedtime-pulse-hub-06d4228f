
import { Youtube, Instagram, X as TwitterX, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Youtube, href: "#youtube", label: "YouTube", color: "hover:text-red-500" },
    { icon: Instagram, href: "#instagram", label: "Instagram", color: "hover:text-pink-500" },
    { icon: TwitterX, href: "#twitter", label: "X (Twitter)", color: "hover:text-blue-500" },
  ];

  const footerLinks = {
    "Navegação": [
      { name: "Início", href: "#" },
      { name: "Últimas Notícias", href: "#noticias" },
      { name: "YouTube", href: "#youtube" },
      { name: "TikTok", href: "#tiktok" },
      { name: "X (Twitter)", href: "#twitter" },
      { name: "Instagram", href: "#instagram" },
    ],
    "Empresa": [
      { name: "Sobre Nós", href: "#" },
      { name: "Contato", href: "#" },
      { name: "Parcerias", href: "#" },
      { name: "Imprensa", href: "#" },
    ],
    "Legal": [
      { name: "Termos de Uso", href: "#" },
      { name: "Política de Privacidade", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "LGPD", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                FeedTime
              </h3>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Sua plataforma completa de agregação de conteúdo. Fique por dentro das últimas tendências e notícias das principais redes sociais, tudo em um só lugar.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-orange-500/40 transition-all duration-300 ${social.color} group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold mb-4 text-orange-400">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>contato@feedtime.com.br</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg">
              <h5 className="text-sm font-semibold text-orange-400 mb-2">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-3">
                Receba as últimas novidades diretamente no seu email.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-r-lg transition-colors text-sm font-medium">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} FeedTime. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <span>Desenvolvido com ❤️ no Brasil</span>
              <span>•</span>
              <span>Versão 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
