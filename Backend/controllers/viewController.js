const View = require('../models/View');

exports.incrementViews = async (req, res) => {
  try {
    // Récupérer l'IP du visiteur ou un identifiant de session
    const visitorId = req.ip;
    
    let view = await View.findOne();
    if (!view) {
      view = new View({ count: 1, visitors: [visitorId] });
    } else {
      // Vérifier si le visiteur a déjà été compté dans les dernières 24h
      const hasVisited = view.visitors.includes(visitorId);
      if (!hasVisited) {
        view.count += 1;
        view.visitors.push(visitorId);
        // Garder seulement les visiteurs des dernières 24h
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        view.visitors = view.visitors.filter(v => v.timestamp > oneDayAgo);
      }
    }
    
    view.lastUpdated = Date.now();
    await view.save();
    res.json({ count: view.count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getViews = async (req, res) => {
  try {
    const view = await View.findOne();
    res.json({ count: view ? view.count : 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
