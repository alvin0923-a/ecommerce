import { LeafIcon, RecycleIcon, ShieldIcon, HeartIcon } from '../components/Icons';

const AboutPage = () => (
  <div className="min-h-screen pt-20 page-enter">
    {/* Hero */}
    <div className="gradient-hero py-20 text-center px-4">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <LeafIcon className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-green-900 mb-4">Our Story</h1>
      <p className="text-green-700 max-w-2xl mx-auto text-lg">
        We started with one simple idea — the world has enough plastic bags. It was time to
        offer something better: beautiful, strong, eco-friendly carry bags for everyday life.
      </p>
    </div>

    {/* Mission */}
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="badge badge-green mb-3">Our Mission</span>
          <h2 className="text-3xl font-bold text-green-900 mb-6">One Bag at a Time, We Replace Plastic</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            EcoBags is a small, passionate team that curates and sells the finest eco-friendly
            carry bags made from natural materials — jute, organic cotton, bamboo fibre, and
            recycled nylon. Every bag in our store replaces hundreds of single-use plastic bags.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With a focused collection of under 10 carefully selected bag models, we believe in
            quality over quantity. Each bag is tested for durability, load capacity, and daily
            usability before it joins our catalog.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { Icon: LeafIcon, stat: '9', title: 'Bag Models' },
            { Icon: RecycleIcon, stat: '500+', title: 'Plastics Replaced / Bag' },
            { Icon: ShieldIcon, stat: '5K+', title: 'Happy Customers' },
            { Icon: LeafIcon, stat: '28+', title: 'States Served' },
          ].map(({ Icon, stat, title }) => (
            <div key={title} className="card p-5 text-center">
              <div className="flex justify-center mb-2">
                <Icon className="w-7 h-7 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-700">{stat}</p>
              <p className="text-xs text-gray-500 mt-1">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Materials */}
    <section className="bg-green-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title">What Our Bags Are Made Of</h2>
        <p className="section-subtitle">Only the finest natural and recycled materials</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { Icon: LeafIcon, title: 'Natural Jute', desc: 'Biodegradable, strong, classic.' },
            { Icon: LeafIcon, title: 'Organic Cotton', desc: 'Soft, washable, GOTS certified.' },
            { Icon: LeafIcon, title: 'Bamboo Fibre', desc: 'Anti-bacterial, elegant.' },
            { Icon: RecycleIcon, title: 'Recycled Nylon', desc: 'Lightweight & waterproof.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="card p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="font-bold text-green-800 text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="section-title">Our Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { Icon: LeafIcon, title: 'Planet First', desc: 'Zero plastic in our products and packaging.' },
          { Icon: ShieldIcon, title: 'Durability', desc: 'Bags built to last years, not a single trip.' },
          { Icon: HeartIcon, title: 'Simplicity', desc: 'Small collection, high standards, no compromise.' },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="card p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="font-bold text-green-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default AboutPage;
