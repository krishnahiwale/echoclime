"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, BookOpen, Clock, User, ChevronLeft, ChevronRight, Calendar, Share2, Bookmark } from "lucide-react"

const stories = [
  {
    id: 1,
    title: "The Disappearing Glaciers of Patagonia",
    excerpt:
      "How satellite data reveals the accelerating retreat of South American ice fields and what it means for global sea levels.",
    fullContent: `The glaciers of Patagonia, stretching across the southern tip of South America, are among the fastest-melting ice masses on Earth. Over the past decade, satellite imagery has documented an alarming acceleration in their retreat, with some glaciers losing up to 30 meters of ice thickness per year.

Our analysis of Landsat and Sentinel-2 data reveals that the Southern Patagonian Ice Field has lost approximately 17 cubic kilometers of ice annually since 2015 – a rate 23% faster than the previous decade. The Grey Glacier in Torres del Paine National Park has retreated by nearly 2 kilometers in the last 20 years.

The implications extend far beyond the region. As these glaciers melt, they contribute to rising sea levels globally. The Patagonian ice fields alone are responsible for approximately 0.05mm of annual sea level rise – seemingly small, but significant when combined with ice loss from Greenland and Antarctica.

Local communities are already feeling the effects. The town of Calafate has seen its freshwater supply become increasingly unpredictable, while glacial lake outburst floods pose growing risks to downstream populations.

Scientists are now using AI-powered analysis to predict future melt rates and help communities prepare for the changes ahead.`,
    image: "/patagonia-glacier-melting-climate-change-mountains.jpg",
    category: "Ice & Glaciers",
    author: "Dr. Maria Santos",
    readTime: "8 min read",
    date: "Jan 8, 2026",
  },
  {
    id: 2,
    title: "Urban Heat Islands: Cities Fighting Back",
    excerpt:
      "Innovative green infrastructure solutions helping major cities reduce temperatures and improve air quality.",
    fullContent: `Urban heat islands – where cities experience significantly higher temperatures than surrounding rural areas – have become one of the most pressing climate adaptation challenges. But innovative cities worldwide are fighting back with creative solutions.

Singapore's "City in a Garden" initiative has transformed the tropical metropolis into a model of urban cooling. By integrating vertical gardens, green corridors, and extensive tree planting, the city has reduced ambient temperatures by up to 4°C in treated areas.

In Los Angeles, the "Cool Streets LA" program has coated over 100 miles of roads with reflective coating that reduces surface temperatures by up to 10°F. The initiative has shown measurable reductions in air conditioning demand in adjacent buildings.

Melbourne, Australia, has committed to doubling its tree canopy by 2040. Early results show that streets with mature tree coverage are up to 6°C cooler than bare streets during summer heat waves.

The economic case is compelling: for every dollar invested in urban cooling infrastructure, cities see returns of $3-5 in reduced healthcare costs, improved productivity, and lower energy consumption.

These solutions aren't just about comfort – they're about survival. Heat waves now kill more people annually than any other weather-related event, and urban residents are disproportionately affected.`,
    image: "/urban-green-city-rooftop-gardens-sustainable.jpg",
    category: "Urban Climate",
    author: "James Chen",
    readTime: "6 min read",
    date: "Jan 5, 2026",
  },
  {
    id: 3,
    title: "Ocean Acidification: The Silent Crisis",
    excerpt: "Understanding how rising CO₂ levels are transforming marine ecosystems and threatening biodiversity.",
    fullContent: `While climate change captures headlines, ocean acidification – often called climate change's "equally evil twin" – quietly threatens marine ecosystems worldwide. Since the industrial revolution, ocean pH has dropped by 0.1 units, representing a 30% increase in acidity.

The chemistry is straightforward: as atmospheric CO₂ rises, more dissolves into seawater, forming carbonic acid. But the consequences are profound. Shell-forming organisms from pteropods to oysters struggle to build their calcium carbonate structures. Coral reefs – home to 25% of all marine species – face a double threat from warming and acidification.

Our monitoring network across the Pacific reveals troubling trends. Upwelling zones along the U.S. West Coast periodically experience corrosive conditions that dissolve the shells of baby oysters before they can develop. The Pacific Northwest oyster industry has already lost $110 million to acidification-related die-offs.

Tropical coral reefs may reach a tipping point as soon as 2050, when waters become too acidic for coral skeleton formation. The Great Barrier Reef has already experienced three mass bleaching events since 2016, with acidification compounding thermal stress.

Yet there are glimmers of hope. Some marine organisms show surprising resilience, and selective breeding programs are developing acid-tolerant strains of commercial shellfish. Scientists are also exploring alkalinity enhancement – adding natural minerals to neutralize acidity in vulnerable coastal waters.`,
    image: "/coral-reef-ocean-underwater-marine-life.jpg",
    category: "Marine Science",
    author: "Dr. Aisha Rahman",
    readTime: "10 min read",
    date: "Jan 2, 2026",
  },
  {
    id: 4,
    title: "Renewable Revolution: India's Solar Story",
    excerpt: "How the world's most populous nation is rapidly transitioning to clean energy and setting new records.",
    fullContent: `India's transformation into a solar superpower represents one of the most dramatic energy transitions in history. In just a decade, the country has increased its solar capacity from less than 3 GW to over 70 GW, with ambitious targets of 500 GW of renewable capacity by 2030.

The Bhadla Solar Park in Rajasthan, spanning 56 square kilometers of desert, is now the world's largest solar installation. Its 2.25 GW capacity powers over 4.5 million homes and has achieved some of the lowest electricity prices ever recorded – just 2 cents per kilowatt-hour.

But India's solar story extends beyond utility-scale projects. The PM-KUSUM scheme has brought solar power to millions of farmers, replacing diesel pumps with solar-powered irrigation. Over 3 million solar pumps have been installed, reducing carbon emissions while cutting farmers' energy costs by 90%.

Rooftop solar is surging in urban areas. Bangalore has emerged as the country's rooftop solar capital, with installations growing 47% annually. New building codes now mandate solar-ready infrastructure in commercial buildings.

The economic transformation is equally remarkable. India's solar sector now employs over 400,000 workers, with numbers expected to triple by 2030. Manufacturing is also shifting, with India establishing integrated solar manufacturing hubs to reduce dependence on imports.

Challenges remain – grid infrastructure must evolve to handle variable renewable generation, and energy storage solutions need to scale up. But India's solar trajectory offers a powerful model for developing nations worldwide.`,
    image: "/solar-panels-india-renewable-energy-farm.jpg",
    category: "Clean Energy",
    author: "Priya Sharma",
    readTime: "7 min read",
    date: "Dec 28, 2025",
  },
  {
    id: 5,
    title: "Amazon Rainforest: Carbon Sink in Crisis",
    excerpt:
      "New data reveals the Amazon is approaching a tipping point that could transform it from carbon sink to carbon source.",
    fullContent: `For millennia, the Amazon rainforest has served as Earth's great carbon sink, absorbing billions of tons of CO₂ annually. But alarming new research suggests this vital ecosystem is approaching a tipping point that could transform it from climate solution to climate problem.

Satellite data from 2010-2023 reveals that the eastern Amazon has already become a net carbon source, releasing more carbon through deforestation, fires, and drought stress than it absorbs through photosynthesis. The southeastern region has experienced its worst droughts in a century, with 2024 breaking all previous records.

The numbers are stark. The Amazon currently stores approximately 150 billion tons of carbon – equivalent to 15 years of global emissions. If the forest crosses its tipping point, releasing even a fraction of this carbon, global climate targets become virtually impossible to achieve.

The tipping point threshold appears to be around 20-25% deforestation – and current levels already exceed 17%. At current clearing rates, this threshold could be reached within 15-20 years.

Yet the story isn't entirely bleak. Indigenous territories, which cover 30% of the Amazon, have deforestation rates 80% lower than surrounding areas. Brazil's recent commitment to zero illegal deforestation, combined with international financing mechanisms like REDD+, offers pathways to preservation.

The technology exists to monitor and protect every hectare of forest in real-time. The question is whether political will can match the urgency of the crisis.`,
    image: "/amazon-rainforest-aerial-view-deforestation.jpg",
    category: "Forests",
    author: "Dr. Carlos Nobre",
    readTime: "12 min read",
    date: "Dec 22, 2025",
  },
  {
    id: 6,
    title: "Himalayan Glaciers: Water Security at Risk",
    excerpt: "How melting Himalayan glaciers threaten the water supply of 2 billion people across South Asia.",
    fullContent: `The Himalayas contain the largest concentration of glaciers outside the polar regions – and they're melting at an unprecedented rate. Known as the "Third Pole," these ice reserves feed Asia's mightiest rivers and supply water to nearly 2 billion people.

ICIMOD's comprehensive glacier inventory reveals that Himalayan glaciers lost 40% of their area over the past four decades. The rate of loss doubled between 2000 and 2020, with average temperatures in the high Himalayas rising twice as fast as the global average.

The Gangotri Glacier, source of the sacred Ganges River, has retreated by over 1.5 kilometers since monitoring began. The Khumbu Glacier below Mount Everest has thinned by over 100 meters in some sections.

The immediate consequence is paradoxical: as glaciers melt faster, rivers initially carry more water. But this "peak water" is temporary. By 2050, the Indus basin is projected to see a 20% reduction in glacier-fed water flow. The Brahmaputra and Ganges basins face similar declines.

For the 270 million people in the Indus basin alone – many dependent on glacier-fed irrigation – the implications are existential. Pakistan's agricultural heartland, India's breadbasket states, and Bangladesh's densely populated delta all face increasing water stress.

Adaptation is crucial. Nepal has pioneered community-based glacier monitoring, training local residents to track changes and plan accordingly. Bhutan has drained dangerous glacial lakes that threaten downstream communities. New irrigation technologies promise to do more with less water.

But without aggressive global action on emissions, these measures can only delay, not prevent, a water crisis of historic proportions.`,
    image: "/himalayan-glacier-mountains-snow-melting.jpg",
    category: "Water Security",
    author: "Tenzing Norbu",
    readTime: "9 min read",
    date: "Dec 18, 2025",
  },
  {
    id: 7,
    title: "Electric Vehicle Revolution in Europe",
    excerpt: "Analyzing the rapid adoption of EVs across European nations and its impact on carbon emissions.",
    fullContent: `Europe's electric vehicle revolution is accelerating faster than even optimistic projections predicted. In 2024, EVs captured 25% of all new car sales across the EU – up from just 3% in 2019. Norway leads globally with EVs representing 90% of new sales, while the Netherlands, Sweden, and Germany follow close behind.

The policy architecture driving this transformation combines carrots and sticks. Purchase incentives reduce upfront costs, while expanding charging networks address range anxiety. Meanwhile, increasingly strict emission standards and urban low-emission zones make internal combustion engines less attractive.

The impact on emissions is measurable. Transport-related CO₂ emissions in the EU fell by 8% in 2024 – the largest single-year decline ever recorded. Cities like Amsterdam and Oslo have seen even larger reductions, with air quality improvements visible in satellite imagery.

The charging infrastructure buildout has been remarkable. Europe now has over 600,000 public charging points, with ultra-fast chargers enabling 80% charges in under 20 minutes. Companies like Ionity and Tesla's Supercharger network (now open to all EVs) have eliminated range anxiety for most journeys.

Battery technology continues to advance. Solid-state batteries, expected to reach mass production by 2027, promise 50% more range and 10-minute charging times. Meanwhile, battery recycling systems are emerging to handle the first generation of EV batteries reaching end-of-life.

The economic ripple effects extend throughout the continent. Traditional auto manufacturing regions in Germany, France, and Italy are racing to retool for electric production, while new battery "gigafactories" bring employment to regions from Sweden to Spain.`,
    image: "/electric-vehicle-charging-station-city.jpg",
    category: "Transport",
    author: "Hans Mueller",
    readTime: "6 min read",
    date: "Dec 15, 2025",
  },
  {
    id: 8,
    title: "Coral Bleaching: Great Barrier Reef Update",
    excerpt: "Latest research shows unprecedented bleaching events threatening the world's largest coral reef system.",
    fullContent: `The Great Barrier Reef – Earth's largest living structure, visible from space – is experiencing its most severe bleaching event on record. Aerial surveys in early 2026 reveal that 80% of the reef system shows signs of bleaching, with 30% experiencing severe bleaching that may prove fatal.

Coral bleaching occurs when ocean temperatures rise just 1-2°C above normal summer maximums. Stressed corals expel the symbiotic algae that give them color and provide most of their nutrition. If temperatures remain elevated for extended periods, the coral dies.

The reef has now experienced seven mass bleaching events since 1998, with the past five occurring in just eight years. Recovery between events – which requires a decade under normal conditions – is increasingly impossible.

The scientific community's response has been innovative. The "coral IVF" program collects coral spawn during annual spawning events, fertilizes eggs in controlled conditions, and releases larvae onto damaged reef sections. Early results show promising survival rates.

Heat-tolerant coral varieties, identified through extensive genetic screening, are being propagated for transplantation. Some naturally resilient reefs in northern sections provide hope that adapted populations can repopulate damaged areas – if given time to do so.

Economic stakes are immense. The Great Barrier Reef generates $6.4 billion annually for Australia's economy and supports 64,000 jobs. Beyond economics, the reef's cultural significance to Indigenous Traditional Owners and its irreplaceable biodiversity make its preservation a global priority.

The reef's fate now depends on how quickly the world reduces greenhouse gas emissions. Even under optimistic scenarios, scientists expect the reef to transform significantly – but aggressive climate action could preserve a functional ecosystem for future generations.`,
    image: "/great-barrier-reef-coral-bleaching-underwater.jpg",
    category: "Marine Science",
    author: "Dr. Sarah Thompson",
    readTime: "11 min read",
    date: "Dec 10, 2025",
  },
  {
    id: 9,
    title: "Sustainable Agriculture: Feeding 10 Billion",
    excerpt:
      "Innovative farming techniques that could revolutionize food production while reducing environmental impact.",
    fullContent: `By 2050, Earth's population will exceed 10 billion people, requiring a 60% increase in food production. Meeting this challenge while reducing agriculture's environmental footprint – currently responsible for 26% of global emissions – demands revolutionary approaches.

Vertical farming has emerged as a leading solution for high-value crops. Singapore's Sky Greens produces vegetables using 95% less water than traditional farming, while indoor farms in the Netherlands achieve yields 350 times higher per square meter than conventional fields.

Precision agriculture is transforming broadacre farming. GPS-guided equipment, drone surveillance, and AI-powered analytics allow farmers to apply water, fertilizers, and pesticides with unprecedented accuracy. Studies show 20-30% reductions in input use while maintaining or improving yields.

Regenerative agriculture goes further, actually reversing degradation. Cover cropping, no-till farming, and integrated livestock management can sequester 2-5 tons of carbon per hectare annually while improving soil health and water retention. Major food companies including General Mills and Danone have committed to transitioning millions of acres to regenerative practices.

Alternative proteins are disrupting the meat industry. Plant-based products from companies like Impossible Foods and Beyond Meat have captured significant market share, while cultivated meat – grown from animal cells without raising animals – is approaching commercial viability.

The developing world is seeing its own agricultural revolution. Mobile-based advisory services reach 100 million smallholder farmers across Africa and Asia, providing weather forecasts, market prices, and agronomic advice that can improve yields by 30% or more.

These solutions aren't mutually exclusive – the future of food likely combines high-tech urban farms, precision-enhanced conventional agriculture, regenerative practices, and diversified protein sources. The technology exists; the challenge is deployment at scale.`,
    image: "/sustainable-farming-vertical-agriculture-greenhous.jpg",
    category: "Agriculture",
    author: "Dr. Emily Watson",
    readTime: "8 min read",
    date: "Dec 5, 2025",
  },
  {
    id: 10,
    title: "Extreme Weather: The New Normal",
    excerpt:
      "How climate change is increasing the frequency and intensity of hurricanes, floods, and wildfires globally.",
    fullContent: `The statistics are stark: weather disasters causing over $1 billion in damage have increased fivefold since the 1980s. Attribution science now allows researchers to quantify climate change's fingerprint on individual events – and the results confirm what many suspected.

Hurricane intensity is increasing measurably. Atlantic storms are 25% more likely to reach Category 4 or 5 status than they were 40 years ago. Rapid intensification – where storms strengthen dramatically in short periods – has become twice as common, giving coastal communities less time to prepare.

Wildfire seasons have lengthened by 78 days on average in the western United States. The 2024 fire season in Canada burned over 18 million hectares – an area larger than Greece. California's Camp Fire in 2018 and Australia's Black Summer in 2019-2020 demonstrated that no developed nation is immune.

Flooding patterns are shifting dramatically. A warmer atmosphere holds 7% more moisture for every 1°C of warming, intensifying rainfall events. Europe's catastrophic floods in 2021 killed over 200 people in events scientists deemed "virtually impossible" without climate change.

Heat waves have become more frequent, longer, and more intense. The 2021 Pacific Northwest heat dome, which killed over 1,000 people in the US and Canada, would have been "virtually impossible" without climate change, according to World Weather Attribution.

The economic toll is staggering. Global insured losses from natural disasters exceeded $130 billion in 2024, with uninsured losses several times higher. Many insurers are retreating from high-risk areas entirely, leaving homeowners and businesses exposed.

Adaptation is no longer optional. Cities are redesigning drainage systems for 100-year floods that now occur every decade. Building codes are being updated for higher wind speeds and fire resistance. Early warning systems save lives when deployed effectively – but require continued investment and international cooperation.`,
    image: "/extreme-weather-storm-hurricane-climate-disaster.jpg",
    category: "Weather",
    author: "Michael Rodriguez",
    readTime: "10 min read",
    date: "Dec 1, 2025",
  },
  {
    id: 11,
    title: "Arctic Ice Loss: Tracking the Decline",
    excerpt: "Satellite imagery reveals the accelerating loss of Arctic sea ice and its global climate implications.",
    fullContent: `The Arctic is warming four times faster than the global average, and its sea ice is disappearing at an alarming rate. Satellite records dating to 1979 show summer Arctic sea ice has declined by 13% per decade, with volume losses even more dramatic at 70% since the 1980s.

The implications extend far beyond polar bears and indigenous communities. Arctic ice acts as Earth's air conditioner, reflecting solar radiation back to space. As white ice gives way to dark open ocean, more heat is absorbed, accelerating warming in a self-reinforcing feedback loop.

Summer 2024 saw the second-lowest Arctic sea ice extent on record. Computer models suggest the Arctic could experience its first ice-free summer (defined as less than 1 million square kilometers) by 2040 – some projections suggest even earlier.

Thawing permafrost presents an additional concern. Arctic soils contain twice as much carbon as the atmosphere. As these soils thaw, they release methane and CO₂, potentially adding the equivalent of an additional major emitting country to global totals.

The geopolitical implications are significant. New shipping routes through the Arctic could reduce transit times between Asia and Europe by 30%. Oil and gas reserves becoming accessible. Five nations – Russia, Canada, the United States, Norway, and Denmark (via Greenland) – are positioning for influence in this emerging strategic arena.

Indigenous communities face the most immediate impacts. Coastal erosion threatens villages, changing ice conditions disrupt traditional hunting practices, and warming waters alter fish populations that communities have relied upon for generations.

International cooperation through bodies like the Arctic Council remains essential, but tensions over resources and military presence complicate governance. The Arctic's fate will be determined as much by global emissions decisions as by regional management.`,
    image: "/arctic-ice-polar-bear-climate-change-melting.jpg",
    category: "Ice & Glaciers",
    author: "Dr. Erik Hansen",
    readTime: "9 min read",
    date: "Nov 25, 2025",
  },
  {
    id: 12,
    title: "Green Building Revolution in Asia",
    excerpt: "How sustainable architecture is transforming urban landscapes across major Asian cities.",
    fullContent: `Asia's construction boom is going green. With the region expected to add 2 billion square meters of new building space annually through 2030, sustainable architecture isn't just environmentally important – it's becoming economically essential.

Singapore leads the charge with its Green Mark certification program, now mandatory for all new buildings. The city-state's newer developments feature vertical gardens, rainwater harvesting, and energy-efficient designs that reduce cooling loads by 30-40%. The jewel Changi Airport terminal, with its massive indoor waterfall and forest, demonstrates that sustainability can be spectacular.

China is rapidly catching up. The country's green building certifications have grown tenfold in the past decade, with mandates requiring all government buildings to meet green standards. Shenzhen's Vanke Center and Beijing's Green Technology Showroom demonstrate world-class sustainable design.

India's GRIHA rating system has certified over 2,500 projects, covering 750 million square feet of construction. Major developers like Godrej Properties and DLF have committed to certifying all new projects, driven by both regulations and market demand from environmentally conscious tenants.

The business case is compelling. Green-certified buildings in Asia command 5-15% rental premiums while reducing operating costs by 20-30%. As energy prices rise and climate regulations tighten, these advantages will only grow.

Innovation is accelerating. Mass timber construction, which stores carbon in building materials, is gaining approval across Asian markets. Building-integrated photovoltaics turn facades into power generators. Smart building systems use AI to optimize energy use in real-time.

The transformation extends to existing buildings. Retrofitting programs in Japan and South Korea are improving energy performance of older structures by 40% or more. With 70% of 2050's building stock already existing today, these upgrades are essential for meeting climate targets.`,
    image: "/green-building-sustainable-architecture-singapore.jpg",
    category: "Urban Climate",
    author: "Lin Wei",
    readTime: "7 min read",
    date: "Nov 20, 2025",
  },
]

export function ImpactStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState(stories[0])

  const storiesPerPage = 8
  const totalPages = Math.ceil(stories.length / storiesPerPage)
  const displayedStories = stories.slice(page * storiesPerPage, (page + 1) * storiesPerPage)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const openFullStory = (story: (typeof stories)[0]) => {
    setSelectedStory(story)
    setIsStoryModalOpen(true)
  }

  return (
    <section id="stories" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="w-3 h-3 mr-1" />
              Data Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Environmental Impact Stories
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Compelling narratives backed by data, bringing climate science to life. Explore {stories.length} in-depth
              stories.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Featured Story */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
            <Image
              src={stories[activeIndex].image || "/placeholder.svg"}
              alt={stories[activeIndex].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge className="mb-3 bg-primary text-primary-foreground">{stories[activeIndex].category}</Badge>
              <h3 className="text-2xl font-bold text-foreground mb-2">{stories[activeIndex].title}</h3>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg text-muted-foreground mb-6">{stories[activeIndex].excerpt}</p>
            <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {stories[activeIndex].author}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {stories[activeIndex].readTime}
              </span>
            </div>
            <Button
              className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground group"
              onClick={() => openFullStory(stories[activeIndex])}
            >
              Read Full Story
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Story Grid - shows 8 stories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedStories.map((story) => (
            <Card
              key={story.id}
              className={`group cursor-pointer border-border bg-card/50 backdrop-blur overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${
                activeIndex === story.id - 1 ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveIndex(story.id - 1)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-background/80 text-foreground backdrop-blur">
                  {story.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{story.date}</span>
                  <span>{story.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={page === i ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(i)}
                className={page === i ? "bg-primary text-primary-foreground" : ""}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-6">
              <Image
                src={selectedStory.image || "/placeholder.svg"}
                alt={selectedStory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {selectedStory.category}
              </Badge>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              {selectedStory.title}
            </DialogTitle>
            <DialogDescription className="sr-only">Full story content for {selectedStory.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {selectedStory.author}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {selectedStory.date}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {selectedStory.readTime}
              </span>
              <div className="flex-1" />
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Full content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {selectedStory.fullContent.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Share2 className="w-4 h-4 mr-2" />
                Share Story
              </Button>
              <Button variant="outline" onClick={() => setIsStoryModalOpen(false)}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore More Stories
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
