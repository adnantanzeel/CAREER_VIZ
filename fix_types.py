#!/usr/bin/env python3
import os
import re

ui_dir = "src/components/ui"

# List of files to fix
fixes = {
    "form.js": [
        ("type FormFieldContextValue<[^>]*>", ""),
        ("React.createContext<FormFieldContextValue>\\(\\{\\} as FormFieldContextValue\\)", "React.createContext({})"),
        ("const FormField = <[^>]*>", "const FormField ="),
        ("type FormItemContextValue = \\{[^}]*\\}", ""),
        ("React.createContext<FormItemContextValue>\\(\\{\\} as FormItemContextValue\\)", "React.createContext({})"),
    ],
    "menubar.js": [
        ("const MenubarShortcut = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.HTMLAttributes<HTMLSpanElement>\\)", "const MenubarShortcut = ({ className, ...props })"),
    ],
    "pagination.js": [
        ("const Pagination = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.ComponentProps<\"nav\">\\)", "const Pagination = ({ className, ...props })"),
        ("type PaginationLinkProps = \\{[^}]*\\}", ""),
        ("const PaginationPrevious = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.ComponentProps<typeof PaginationLink>\\)", "const PaginationPrevious = ({ className, ...props })"),
        ("const PaginationNext = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.ComponentProps<typeof PaginationLink>\\)", "const PaginationNext = ({ className, ...props })"),
        ("const PaginationEllipsis = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.ComponentProps<\"span\">\\)", "const PaginationEllipsis = ({ className, ...props })"),
    ],
    "resizable.js": [
        ("const ResizablePanelGroup = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.ComponentProps<typeof ResizablePrimitive\\.PanelGroup>\\)", "const ResizablePanelGroup = ({ className, ...props })"),
        ("[^:]*: React\\.ComponentProps<typeof ResizablePrimitive\\.PanelResizeHandle>\\)", ")"),
    ],
    "sheet.js": [
        ("interface SheetContentProps[^{]*\\{[^}]*\\}", ""),
        ("const SheetHeader = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.HTMLAttributes<HTMLDivElement>\\)", "const SheetHeader = ({ className, ...props })"),
        ("const SheetFooter = \\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.HTMLAttributes<HTMLDivElement>\\)", "const SheetFooter = ({ className, ...props })"),
    ],
    "skeleton.js": [
        ("function Skeleton\\(\\{ className, \\.\\.\\.props \\}[^:]*: React\\.HTMLAttributes<HTMLDivElement>\\)", "function Skeleton({ className, ...props })"),
    ],
    "sonner.js": [
        ("type ToasterProps = React\\.ComponentProps<typeof Sonner>;", ""),
        ("theme=\\{theme as ToasterProps\\[\"theme\"\\]\\}", "theme={theme}"),
    ],
}

for file_name, patterns in fixes.items():
    filepath = os.path.join(ui_dir, file_name)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        original = content
        for pattern, replacement in patterns:
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        if content != original:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Fixed: {file_name}")

print("Done!")
