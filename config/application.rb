require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module WeEat

  MIN_REVIEW_RATING = 0.0
  MAX_REVIEW_RATING = 3.0
  DELIVERY_TIMES = 15.step(120, 15).to_a.freeze

  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.assets.paths << Rails.root.join("app", "assets", "fonts")
  end
end
