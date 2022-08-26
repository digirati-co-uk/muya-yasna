from django.core.management.base import BaseCommand, CommandError
from yasna.ingest.manage_data_loading import load_normalised


class Command(BaseCommand):
    help = "Management command to add a data to the platform "
    required_opts = {
        "--framef": "Path to the Unique Frames file",
        "--normf": "Path to the Normalised With Frames file"
    }

    def add_arguments(self, parser):
        for opt, help in self.required_opts.items():
            parser.add_argument(opt, nargs=1, type=str, default=None, required=True, help=help)

    def handle(self, *args, **options):
        supplied_opts = {}
        for opt in self.required_opts.keys():
            opt_kw = opt.replace("--","")
            supplied_opts[opt_kw] = options.get(opt_kw)[0]
        print(f"Running Yasna Tracking Ingest command with files {str(supplied_opts)}")
        load_normalised(delete_existing=True, **supplied_opts)
