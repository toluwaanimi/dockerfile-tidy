# Change Log

All notable changes to the "dockerfile-tidy" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.7] - 2024-08-25

### Fixed
- Continued refinements to the indenting of key-value pairs in `ENV`, `ARG`, and `LABEL` instructions to ensure proper alignment and consistent formatting.

## [0.0.6] - 2024-08-25

### Fixed
- Further adjustments to key-value pair formatting to correct spacing issues in `ENV`, `ARG`, and `LABEL` instructions.

## [0.0.5] - 2024-08-25

### Fixed
- Resolved additional issues related to the indenting of key-value pairs, ensuring that the alignment remains consistent across different Dockerfile instructions.

## [0.0.4] - 2024-08-25

### Fixed
- Resolved an issue where recursive equal signs (`=`) appeared in key-value pairs, ensuring correct formatting in `ENV`, `ARG`, and `LABEL` instructions.

## [0.0.3] - 2024-08-25

### Fixed
- Corrected the indentation and spacing of `LABEL` and `ENV` instructions, ensuring that the equals sign (`=`) is aligned properly.

## [0.0.2] - 2024-08-25

### Fixed
- Resolved a bug causing recursive formatting when saving Dockerfiles, preventing unintended repeated modifications.

## [0.0.1] - 2024-08-25

### Added
- Initial release of the "dockerfile-tidy" extension.
- Added functionality to format Dockerfiles automatically on save.
- Ensures proper indentation and inserts blank lines between Dockerfile instructions.
- Supports multi-line instructions with appropriate indentation.
- Preserves comments and blank lines in Dockerfiles.
- Formats key-value pairs in `ENV`, `ARG`, and `LABEL` instructions with aligned equals signs for improved readability.