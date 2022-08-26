from django.core.management.base import BaseCommand, CommandError
from yasna.ingest.manage_data_loading import delete_all_yasna_data


class Command(BaseCommand):
    help = "Management command to delete all data, prior to loading fixtures and ingesting avro."

    def handle(self, *args, **options):
        delete_all_yasna_data()
