import os
import subprocess

def get_gitignore_patterns(directory):
    gitignore_path = os.path.join(directory, ".gitignore")
    ignore_patterns = set()
    
    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    ignore_patterns.add(line)
    ignore_patterns.update(["package-lock.json", "README.md"])  # Exclude package-lock.json and README.md explicitly
    return ignore_patterns

def is_ignored(path, ignore_patterns, base_directory):
    rel_path = os.path.relpath(path, base_directory)
    return any(rel_path.startswith(pattern) or rel_path == pattern for pattern in ignore_patterns)

def combine_files_into_text(directory, output_file=None):
    print(f"Scanning directory: {directory}")
    
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return
    
    output_file = output_file or f"{directory}_combined_code.txt"
    
    if os.path.exists(output_file):
        try:
            os.remove(output_file)
            print(f"Previous file '{output_file}' deleted.")
        except Exception as e:
            print(f"Error deleting file '{output_file}': {e}")
    
    combined_content = []
    combined_content.append(f"# Directory: {directory}\n")
    combined_content.append("=" * 80 + "\n")
    
    # Load .gitignore patterns
    ignore_patterns = get_gitignore_patterns(directory)
    
    # Generate directory structure using tree command
    try:
        tree_output = subprocess.check_output(["tree", directory], text=True)
        combined_content.append("# Directory Structure\n")
        combined_content.append(tree_output)
        combined_content.append("\n" + "=" * 80 + "\n")
    except FileNotFoundError:
        print("Tree command not found. Skipping directory structure.")
        combined_content.append("# Directory structure not available (tree command not found)\n")
        combined_content.append("=" * 80 + "\n")
    
    # Process files
    for root, _, files in os.walk(directory):
        if is_ignored(root, ignore_patterns, directory):
            continue
        
        for file in sorted(files):
            file_path = os.path.join(root, file)
            if is_ignored(file_path, ignore_patterns, directory):
                continue
            
            if file.endswith((".ts", ".tsx", ".json", ".md", ".css", ".scss")) or file in ["next.config.js", "tsconfig.json", ".eslintrc.json"]:
                print(f"Processing file: {file_path}")
                
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        relative_path = os.path.relpath(file_path, directory)
                        combined_content.append(f"# {relative_path}\n")
                        combined_content.append(f.read())
                        combined_content.append("\n" + "=" * 80 + "\n")
                except (UnicodeDecodeError, FileNotFoundError) as e:
                    print(f"Error reading file {file_path}: {e}")
    
    if combined_content:
        try:
            with open(output_file, "w", encoding="utf-8") as output:
                output.write("\n".join(combined_content))
            print(f"Combined content written to {output_file}")
        except Exception as e:
            print(f"Error writing to file {output_file}: {e}")
    else:
        print("No valid files found to combine.")

if __name__ == "__main__":
    directory = input("Enter the name of the directory to scan: ").strip()
    combine_files_into_text(directory)
