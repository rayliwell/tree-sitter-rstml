fn main() {
    let rstml_dir = std::path::Path::new("rstml/src");
    let rust_with_rstml_dir = std::path::Path::new("rust_with_rstml/src");

    let mut c_config = cc::Build::new();

    c_config.include(&rstml_dir);
    c_config
        .flag_if_supported("-std=c11")
        .flag_if_supported("-Wno-unused-parameter");

    for path in &[
        rstml_dir.join("parser.c"),
        rstml_dir.join("scanner.c"),
        rust_with_rstml_dir.join("parser.c"),
        rust_with_rstml_dir.join("scanner.c"),
    ] {
        c_config.file(&path);
        println!("cargo:rerun-if-changed={}", path.to_str().unwrap());
    }

    c_config.compile("parser");
}
